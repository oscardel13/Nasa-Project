class Guest{
    constructor(){
        this.mode = false
    }

    setMode(){
        this.mode = !this.mode
    } 
}

const guest = new Guest

module.exports = guest