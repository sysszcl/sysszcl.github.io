/**
 * 站内搜索 - 重构增强版
 * 基于hexo-generator-search，改进：防抖、相关度排序、中文优化、移动端支持
 */

var searchFunc = function(path, search_id, content_id) {
    'use strict';

    // ========== 工具函数 ==========

    // 防抖
    function debounce(fn, delay) {
        var timer = null;
        return function() {
            var ctx = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function() {
                fn.apply(ctx, args);
            }, delay);
        };
    }

    // 转义正则特殊字符
    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // 高亮关键词（支持HTML安全输出）
    function highlightKeyword(text, keywords) {
        if (!text) return '';
        var result = text;
        keywords.forEach(function(kw) {
            if (!kw) return;
            var reg = new RegExp(escapeRegex(kw), 'gi');
            result = result.replace(reg, function(match) {
                return '<em class="search-keyword">' + match + '</em>';
            });
        });
        return result;
    }

    // 智能截取摘要（以第一个关键词位置为中心，取前后字符）
    function getExcerpt(content, keywords, len) {
        len = len || 120;
        if (!content) return '';

        var lower = content.toLowerCase();
        var firstPos = -1;

        // 找到第一个关键词出现的位置
        for (var i = 0; i < keywords.length; i++) {
            if (!keywords[i]) continue;
            var pos = lower.indexOf(keywords[i]);
            if (pos !== -1 && (firstPos === -1 || pos < firstPos)) {
                firstPos = pos;
            }
        }

        if (firstPos === -1) {
            // 没有匹配到内容中的关键词，从开头截取
            return content.substring(0, len);
        }

        // 以关键词位置为中心截取
        var start = Math.max(0, firstPos - 30);
        var end = Math.min(content.length, start + len);
        var excerpt = '';

        if (start > 0) excerpt += '...';
        excerpt += content.substring(start, end);
        if (end < content.length) excerpt += '...';

        return excerpt;
    }

    // ========== 加载搜索数据 ==========

    var BTN = "<i id='local-search-close'>&times;</i>";

    $.ajax({
        url: path,
        dataType: "xml",
        success: function(xmlResponse) {
            var datas = $("entry", xmlResponse).map(function() {
                return {
                    title: $("title", this).text(),
                    content: $("content", this).text(),
                    url: $("url", this).text()
                };
            }).get();

            var $input = document.getElementById(search_id);
            var $resultContent = document.getElementById(content_id);

            // ========== 搜索逻辑 ==========

            var doSearch = debounce(function() {
                var inputValue = $input.value.trim();
                var str = '';
                $resultContent.innerHTML = '';

                if (inputValue.length <= 0) {
                    return;
                }

                var keywords = inputValue.toLowerCase().split(/[\s\-]+/).filter(function(k) {
                    return k.length > 0;
                });

                if (keywords.length === 0) return;

                // 搜索并计算相关度
                var results = [];

                datas.forEach(function(data) {
                    if (!data.title || data.title.trim() === '') {
                        data.title = "Untitled";
                    }

                    var data_title = data.title.trim();
                    var data_title_lower = data_title.toLowerCase();
                    var data_content = data.content.trim().replace(/<[^>]+>/g, "");
                    var data_content_lower = data_content.toLowerCase();
                    var data_url = data.url;

                    var score = 0;
                    var titleMatch = false;
                    var contentMatch = false;
                    var matchCount = 0;

                    keywords.forEach(function(keyword) {
                        var titleIdx = data_title_lower.indexOf(keyword);
                        var contentIdx = data_content_lower.indexOf(keyword);

                        if (titleIdx !== -1) {
                            titleMatch = true;
                            score += 10; // 标题匹配权重最高

                            // 完全匹配标题权重额外加成
                            if (data_title_lower === keyword) {
                                score += 20;
                            }
                            // 标题开头匹配加成
                            if (titleIdx === 0) {
                                score += 5;
                            }
                        }

                        if (contentIdx !== -1) {
                            contentMatch = true;
                            score += 2; // 内容匹配基础分
                            matchCount++;

                            // 关键词在内容中出现多次，额外加分
                            var tempContent = data_content_lower;
                            var occurrences = 0;
                            var searchPos = 0;
                            while ((searchPos = tempContent.indexOf(keyword, searchPos)) !== -1) {
                                occurrences++;
                                searchPos += keyword.length;
                                if (occurrences >= 5) break; // 最多计5次
                            }
                            score += occurrences * 1;
                        }
                    });

                    // 所有关键词必须至少在标题或内容中出现
                    if (titleMatch || contentMatch) {
                        results.push({
                            title: data_title,
                            content: data_content,
                            url: data_url,
                            score: score
                        });
                    }
                });

                // 按相关度降序排序
                results.sort(function(a, b) {
                    return b.score - a.score;
                });

                // 最多显示20条
                var displayResults = results.slice(0, 20);

                if (displayResults.length === 0) {
                    $resultContent.innerHTML = BTN +
                        '<div class="search-result-list" style="padding: 0;">' +
                        '<span class="local-search-empty">没有找到相关内容，换个关键词试试吧~</span>' +
                        '</div>';
                    return;
                }

                // 状态栏
                str = '<div class="search-status-bar">' +
                    '找到 <span class="search-count">' + results.length + '</span> 个相关结果' +
                    (results.length > 20 ? '（显示前 20 条）' : '') +
                    '</div>';

                str += '<ul class="search-result-list">';

                displayResults.forEach(function(item) {
                    var excerpt = getExcerpt(item.content, keywords, 120);
                    var highlightedExcerpt = highlightKeyword(excerpt, keywords);
                    var highlightedTitle = highlightKeyword(item.title, keywords);

                    str += '<li>' +
                        '<a href="' + item.url + '" class="search-result-title">' + highlightedTitle + '</a>' +
                        '<p class="search-result">' + highlightedExcerpt + '</p>' +
                        '<span class="search-result-url">' + item.url + '</span>' +
                        '</li>';
                });

                str += '</ul>';
                $resultContent.innerHTML = BTN + str;

            }, 250); // 250ms 防抖

            $input.addEventListener('input', doSearch);

            // ESC 键关闭搜索结果
            $input.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' || e.keyCode === 27) {
                    $input.value = '';
                    $resultContent.innerHTML = '';
                    $input.blur();
                }
            });
        },
        error: function(xhr, status, error) {
            console.error('搜索数据加载失败:', error);
            var $resultContent = document.getElementById(content_id);
            $resultContent.innerHTML = BTN +
                '<div class="search-result-list" style="padding: 0;">' +
                '<span class="local-search-empty">搜索数据加载失败，请刷新重试</span>' +
                '</div>';
        }
    });

    // ========== 事件绑定 ==========

    // SVG 图标模板
    var SVG_SEARCH = '<svg viewBox="0 0 24 24" width="16" height="16"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    var SVG_CLOSE = '<svg viewBox="0 0 24 24" width="16" height="16"><line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

    // 关闭按钮
    $(document).on('click', '#local-search-close', function() {
        $('#local-search-input').val('');
        $('#local-search-result').html('');
    });

    // 搜索图标切换：聚焦时切换为关闭图标
    $(document).on('focus', '#local-search-input', function() {
        var $icon = $('#local-search-icon-search');
        if ($icon.length) {
            $icon.html(SVG_CLOSE)
                  .attr('id', 'local-search-icon-close')
                  .removeClass('search-icon-search')
                  .addClass('search-icon-close');
        }
    });

    $(document).on('blur', '#local-search-input', function() {
        if (!$(this).val() || $(this).val().trim() === '') {
            var $icon = $('#local-search-icon-close');
            if ($icon.length) {
                $icon.html(SVG_SEARCH)
                      .attr('id', 'local-search-icon-search')
                      .removeClass('search-icon-close')
                      .addClass('search-icon-search');
            }
        }
    });

    $(document).on('click', '#local-search-icon-close', function() {
        $('#local-search-input').val('');
        $('#local-search-result').html('');
        $(this).html(SVG_SEARCH)
               .attr('id', 'local-search-icon-search')
               .removeClass('search-icon-close')
               .addClass('search-icon-search');
    });

    // 点击页面其他区域关闭搜索结果
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.local-search').length) {
            $('#local-search-result').html('');
        }
    });
};