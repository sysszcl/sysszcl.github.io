---
title: 实现EML格式邮件批量导入EXCEL文档
abbrlink: 92bf9ad3
date: 2025-07-02 22:12:00
tags:
  - EXCEL
categories:
  - Office
declare: true
reward: true
---

#### 第一步： 将EML邮件全部放在一个文件夹中

#### 第二步： 新建EXCEL文档，新建宏

#### 第三步： 复制以下代码到宏中，修改emlFolderPath = "C:\Your\EML\Folder\Path\" ' 为您的实际路径后运行

<!-- more -->

```vba
Option Explicit

Sub ImportAllEMLFromFolder()
    Dim fso As Object ' Scripting.FileSystemObject
    Dim folder As Object ' Scripting.Folder
    Dim file As Object ' Scripting.File
    Dim emlFolderPath As String
    Dim ws As Worksheet
    Dim msg As Object ' CDO.Message
    Dim iRow As Long
    Dim stream As Object ' ADODB.Stream
    Dim startTime As Double
    Dim fileCount As Long
    
    ' 记录开始时间
    startTime = Timer
    
    ' 设置EML文件夹路径 - 修改为您实际的EML文件夹路径
    emlFolderPath = "C:\Your\EML\Folder\Path\" ' 请修改为您的实际路径
    
    ' 检查文件夹路径是否有效
    Set fso = CreateObject("Scripting.FileSystemObject")
    If Not fso.FolderExists(emlFolderPath) Then
        MsgBox "指定的文件夹路径不存在，请修改路径后重试！" & vbCrLf & _
               "当前路径: " & emlFolderPath, vbExclamation
        Exit Sub
    End If
    
    ' 创建工作表
    On Error Resume Next
    Application.DisplayAlerts = False
    Worksheets("EML内容").Delete
    Application.DisplayAlerts = True
    On Error GoTo ErrorHandler
    
    Set ws = Worksheets.Add(After:=Worksheets(Worksheets.Count))
    ws.Name = "EML内容"
    
    ' 设置表头
    With ws
        .Cells(1, 1).Value = "序号"
        .Cells(1, 2).Value = "文件名"
        .Cells(1, 3).Value = "发件人"
        .Cells(1, 4).Value = "收件人"
        .Cells(1, 5).Value = "抄送"
        .Cells(1, 6).Value = "主题"
        .Cells(1, 7).Value = "日期"
        .Cells(1, 8).Value = "正文内容"
        .Cells(1, 9).Value = "附件名称"
        .Cells(1, 10).Value = "文件路径"
    End With
    
    ' 设置表头格式
    With ws.Range("A1:J1")
        .Font.Bold = True
        .Interior.Color = RGB(200, 200, 200)
        .HorizontalAlignment = xlCenter
    End With
    
    ' 初始化计数器
    iRow = 2
    fileCount = 0
    
    ' 创建必要的对象
    Set stream = CreateObject("ADODB.Stream")
    Set folder = fso.GetFolder(emlFolderPath)
    
    ' 显示进度条
    Application.StatusBar = "正在处理EML文件，请稍候..."
    
    ' 遍历文件夹中的所有文件
    For Each file In folder.Files
        If LCase(fso.GetExtensionName(file.Name)) = "eml" Then
            fileCount = fileCount + 1
            
            ' 读取EML文件
            Set msg = CreateObject("CDO.Message")
            With stream
                .Type = 1 ' adTypeBinary
                .Open
                .LoadFromFile file.Path
                .Position = 0
                .Type = 2 ' adTypeText
                .Charset = "utf-8"
            End With
            
            msg.DataSource.OpenObject stream, "_Stream"
            
            ' 写入Excel
            With ws
                ' 序号
                .Cells(iRow, 1).Value = fileCount
                
                ' 文件名
                .Cells(iRow, 2).Value = file.Name
                
                ' 发件人
                .Cells(iRow, 3).Value = msg.From
                
                ' 收件人
                .Cells(iRow, 4).Value = msg.To
                
                ' 抄送
                .Cells(iRow, 5).Value = msg.CC
                
                ' 主题
                .Cells(iRow, 6).Value = msg.Subject
                
                ' 日期
                If Not IsNull(msg.SentOn) Then
                    .Cells(iRow, 7).Value = msg.SentOn
                    .Cells(iRow, 7).NumberFormat = "yyyy-mm-dd hh:mm:ss"
                End If
                
                ' 正文内容
                .Cells(iRow, 8).Value = GetEmailBody(msg)
                
                ' 附件名称
                .Cells(iRow, 9).Value = GetAttachmentsNames(msg)
                
                ' 文件路径
                .Cells(iRow, 10).Value = file.Path
            End With
            
            iRow = iRow + 1
            Set msg = Nothing
            stream.Close
            
            ' 每处理10个文件刷新一次屏幕
            If fileCount Mod 10 = 0 Then
                Application.StatusBar = "正在处理EML文件，已处理 " & fileCount & " 个..."
                DoEvents
            End If
        End If
    Next file
    
    ' 自动调整列宽
    ws.Columns.AutoFit
    
    ' 添加边框
    With ws.Range("A1:J" & iRow - 1).Borders
        .LineStyle = xlContinuous
        .Weight = xlThin
    End With
    
    ' 冻结首行
    ws.Activate
    ws.Rows(2).Select
    ActiveWindow.FreezePanes = True
    ws.Range("A1").Select
    
    ' 计算处理时间
    Dim elapsedTime As String
    elapsedTime = Format((Timer - startTime) / 86400, "hh:mm:ss")
    
    ' 完成提示
    Application.StatusBar = False
    MsgBox "EML文件导入完成！" & vbCrLf & _
           "共处理 " & fileCount & " 个EML文件" & vbCrLf & _
           "耗时: " & elapsedTime, vbInformation
    
CleanUp:
    ' 释放对象
    On Error Resume Next
    If Not stream Is Nothing Then
        If stream.State <> 0 Then stream.Close
        Set stream = Nothing
    End If
    Set fso = Nothing
    Set folder = Nothing
    Set file = Nothing
    Set ws = Nothing
    Exit Sub
    
ErrorHandler:
    Application.StatusBar = False
    MsgBox "错误 " & Err.Number & ": " & Err.Description & vbCrLf & _
           "发生在处理文件: " & file.Path, vbExclamation
    Resume CleanUp
End Sub

Function GetEmailBody(msg As Object) As String
    Dim body As String
    Dim htmlBody As String
    
    On Error Resume Next
    
    ' 尝试获取纯文本正文
    body = msg.TextBody
    
    ' 如果没有纯文本正文，则获取HTML正文
    If body = "" Then
        htmlBody = msg.HTMLBody
        
        ' 简单的HTML到纯文本转换（去除标签）
        body = StripHTML(htmlBody)
    End If
    
    ' 限制内容长度以避免单元格溢出
    If Len(body) > 32767 Then
        body = Left(body, 32767) & "...[内容截断]"
    End If
    
    GetEmailBody = body
End Function

Function StripHTML(htmlText As String) As String
    ' 简单的HTML标签去除函数
    Dim regEx As Object
    Set regEx = CreateObject("VBScript.RegExp")
    
    With regEx
        .Global = True
        .MultiLine = True
        .IgnoreCase = True
        .Pattern = "<[^>]+>" ' 匹配所有HTML标签
    End With
    
    StripHTML = regEx.Replace(htmlText, "")
    
    ' 替换常见的HTML实体
    StripHTML = Replace(StripHTML, "&nbsp;", " ")
    StripHTML = Replace(StripHTML, "&amp;", "&")
    StripHTML = Replace(StripHTML, "&lt;", "<")
    StripHTML = Replace(StripHTML, "&gt;", ">")
    StripHTML = Replace(StripHTML, "&quot;", """")
    
    ' 去除多余的空格和换行
    StripHTML = Application.WorksheetFunction.Clean(StripHTML)
    StripHTML = Replace(Replace(Replace(StripHTML, vbCrLf, " "), vbCr, " "), vbLf, " ")
    
    ' 合并连续空格
    Do While InStr(StripHTML, "  ") > 0
        StripHTML = Replace(StripHTML, "  ", " ")
    Loop
    
    Set regEx = Nothing
End Function

Function GetAttachmentsNames(msg As Object) As String
    Dim att As Object ' CDO.IBodyPart
    Dim attNames As String
    Dim i As Integer
    
    On Error Resume Next
    
    attNames = ""
    
    For i = 1 To msg.Attachments.Count
        Set att = msg.Attachments.Item(i)
        If attNames <> "" Then attNames = attNames & "; "
        attNames = attNames & att.FileName
    Next i
    
    ' 限制内容长度以避免单元格溢出
    If Len(attNames) > 32767 Then
        attNames = Left(attNames, 32767) & "...[内容截断]"
    End If
    
    GetAttachmentsNames = attNames
End Function
```