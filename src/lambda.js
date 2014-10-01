;(function(ctx) {
    var undefined,
        proto = "prototype"

    var L = function(data) {
        if (this == ctx) {
            return new L(data)
        }

        this.data = data || []
    }

    L.extend = function(dest, src, deep) {
        Object.keys(src).forEach(function(key) {
            dest[key] = src[key]
            if (deep && L.isObject(src[key])) {
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
    L.type = function(v) {
        return Object.prototype.toString.call(v).slice(8, -1)
    }
    ;["Arguments", "Array", "Boolean", "Date", "Function", "Null", "Number", "Object", "RegExp", "String", "Undefined"].forEach(function(name) {
        L["is"+ name] = function(v) {
            return L.type(v) == name
        }
    })
    L.isNumeric = function(v) {
        return !isNaN(parseFloat(v))
    }
    L.isScalar = function(v) {
        return ["Boolean", "Number", "String"].indexOf(L.type(v)) > -1
    }
    L.isCompound = function(v) {
        return ["Arguments", "Array", "Date", "Object", "RegExp"].indexOf(L.type(v)) > -1
    }

    /**
     * export to either browser or node.js
     */
    if (typeof exports !== "undefined") {
        exports.L = L
    }
    else {
        ctx.L = L

        if (typeof define === "function" && define.amd) {
            define(function() {
                return {
                    L: L
                }
            })
        }
    }
})(typeof window === "undefined" ? this : window)
