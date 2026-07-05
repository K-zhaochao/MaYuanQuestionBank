// 数据合并初始化 + 基础兜底
(function() {
    var chapters = window.__CHAPTER_DATA__ || [];
    chapters.forEach(function(ch) {
        var counters = { single: 0, multi: 0, judge: 0 };
        ch.questions.forEach(function(q) {
            var type = q.type || 'single';
            counters[type] = (counters[type] || 0) + 1;
            // 仅在缺失时兜底，保留数据文件中按 docs 生成的题型内序号。
            if (!q.index) q.index = counters[type];
            // 仅在缺失或明显异常时修复 ID。
            if (!q.id || q.id.indexOf('-') < 0) {
                var prefix = type === 'multi' ? 'm' : (type === 'judge' ? 'j' : 's');
                q.id = ch.id + '-' + prefix + '-' + String(counters[type]).padStart(3, '0');
            }
            // 清理 content 中的重复括号
            if (q.content) {
                q.content = q.content.replace(/（）（）/g, '（）').replace(/\(\)\(\)/g, '（）');
            }
        });
    });
    chapters.sort(function(a, b) { return a.id.localeCompare(b.id); });
    window.QUESTION_BANK = { chapters: chapters };
    delete window.__CHAPTER_DATA__;
})();
