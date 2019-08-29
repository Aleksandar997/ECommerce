interface String {
    firstCharToLower(): string;
    firstCharToUpper(): string;
    toBoolean(): boolean;
}

String.prototype.firstCharToLower = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
};

String.prototype.firstCharToUpper = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.toBoolean = function() {
    if (this.toLowerCase() === 'true') {
        return true;
    }
    return false;
};


