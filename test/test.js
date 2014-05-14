var assert = require("assert"),
    collectionjs = require("../src/collection.js"),
    collection = collectionjs.collection

describe("collectionjs", function() {
    it("should return the type of the argument", function() {
        assert.equal("Arguments", collection.type(arguments))
        assert.equal("Array", collection.type([]))
        assert.equal("Boolean", collection.type(true))
        assert.equal("Date", collection.type(new Date))
        assert.equal("Function", collection.type(function() {}))
        assert.equal("Number", collection.type(1))
        assert.equal("Object", collection.type({}))
        assert.equal("RegExp", collection.type(/^/))
        assert.equal("String", collection.type(""))
        assert.equal("Undefined", collection.type(undefined))

        assert.equal(true, collection.isNumeric("1"))
        assert.equal(false, collection.isNumeric("a"))
    })
})