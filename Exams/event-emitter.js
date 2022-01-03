const fs = require('fs')

class EventEmitter {
    constructor() {
        this.eventHandlers = {}
    }

    on(eventName, callBack) {
        this.eventHandlers[eventName] =
            (this.eventHandlers[eventName] || []).concat(callBack)
    }

    emit(eventName, data) {
        (this.eventHandlers[eventName] || []).forEach(callBack => callBack(data))
    }
}

class Reader extends EventEmitter {
    constructor(options) {
        super()
        this.options = options
    }

    readFile(fileName) {
        fs.readFile(fileName, this.options, (err, data) => {
            if (err) {
                this.emit('error', err)
                return
            }

            this.emit('data', data)
        })
    }
}

const reader = new Reader({ encoding: 'utf8' })
reader.on('data', console.log)
reader.on('error', console.error)
reader.readFile('test.txt')