interface Array<T> {
    firstElement();
    assignObject(init?: Array<Partial<object>>);
}
Array.prototype.firstElement = function() {
    if (this && this.length > 0) {
        return this[0];
    }
    return this;
};

Array.prototype.assignObject = function(init?: Array<Partial<object>>) {
    Object.assign(this, init);
};





