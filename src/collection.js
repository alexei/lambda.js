(function(window) {
    var undefined

    var _ = function(array) {
    }

    _.extend = function(dest, src, deep) {
        Object.keys(src).forEach(function(key) {
            dest[key] = src[key]
            if (deep && _.isObject(src[key])) {
                dest[key] = src[key] || {}
                arguments.callee(dest[key], src[key])
            }
            else {
                dest[key] = src[key]
            }
        })

        return dest
    }

    /**
     * type related function
     */
    _.type = function(v) {
        return Object.prototype.toString.call(v).slice(8, -1)
    }
    ["Arguments", "Array", "Boolean", "Date", "Function", "Null", "Number", "Object", "RegExp", "String", "Undefined"].forEach(function(name) {
        _["is"+ name] = function(v) {
            return _.type(v) == name
        }
    })
    _.isNumeric = function(v) {
        return !isNaN(parseFloat(v))
    }

    /**
     * export to either browser or node.js
     */
    if (typeof exports !== "undefined") {
        exports.collection = _
    }
    else {
        window.collection = _

        if (typeof define === "function" && define.amd) {
            define(function() {
                return {
                    collection: _
                }
            })
        }
    }
})(typeof window === "undefined" ? this : window)