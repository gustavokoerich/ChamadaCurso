exports.frequencyCalculation = (presence, classCount) => {
    const newFrequency = (presence/classCount * 100).toFixed(2)+'%'
    return newFrequency
}

exports.Student = class {
    constructor(id, name, presence, frequency) {
        this.id = id
        this.name = name
        this.presence = presence
        this.frequency = frequency
    }
}

