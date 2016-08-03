System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TaskRequest;
    return {
        setters:[],
        execute: function() {
            TaskRequest = (function () {
                function TaskRequest(title, description, tags, user, dueDate, issCompleted) {
                    this.title = title;
                    this.description = description;
                    this.tags = tags;
                    this.user = user;
                    this.dueDate = dueDate;
                    this.issCompleted = issCompleted;
                }
                return TaskRequest;
            }());
            exports_1("TaskRequest", TaskRequest);
        }
    }
});
//# sourceMappingURL=task-request.js.map