;(function(ctx) {
    var undefined,
        proto = "prototype"

    var _ = function(data) {
        if (this == ctx) {
            return new _(data)
        }

        this.data = data || []
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
    ;["Arguments", "Array", "Boolean", "Date", "Function", "Null", "Number", "Object", "RegExp", "String", "Undefined"].forEach(function(name) {
        _["is"+ name] = function(v) {
            return _.type(v) == name
        }
    })
    _.isNumeric = function(v) {
        return !isNaN(parseFloat(v))
    }
    _.isScalar = function(v) {
        return ["Boolean", "Number", "String"].indexOf(_.type(v)) > -1
    }
    _.isCompound = function(v) {
        return ["Arguments", "Array", "Date", "Object", "RegExp"].indexOf(_.type(v)) > -1
    }

    /**
     * export to either browser or node.js
     */
    if (typeof exports !== "undefined") {
        exports.collection = _
    }
    else {
        ctx.collection = _

        if (typeof define === "function" && define.amd) {
            define(function() {
                return {
                    collection: _
                }
            })
        }
    }
})(typeof window === "undefined" ? this : window)