self.addEventListener('message', function(e) {
    self.postMessage("worker: " + e.data + " hahahahah. Hi from the worker!");
}, false);