"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/react-intersection-observer";
exports.ids = ["vendor-chunks/react-intersection-observer"];
exports.modules = {

/***/ "(ssr)/./node_modules/react-intersection-observer/dist/index.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/react-intersection-observer/dist/index.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   InView: () => (/* binding */ InView),\n/* harmony export */   defaultFallbackInView: () => (/* binding */ defaultFallbackInView),\n/* harmony export */   observe: () => (/* binding */ observe),\n/* harmony export */   useInView: () => (/* binding */ useInView)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js\");\n/* __next_internal_client_entry_do_not_use__ InView,defaultFallbackInView,observe,useInView auto */ var __defProp = Object.defineProperty;\nvar __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {\n        enumerable: true,\n        configurable: true,\n        writable: true,\n        value\n    }) : obj[key] = value;\nvar __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== \"symbol\" ? key + \"\" : key, value);\n// src/InView.tsx\n\n// src/observe.ts\nvar observerMap = /* @__PURE__ */ new Map();\nvar RootIds = /* @__PURE__ */ new WeakMap();\nvar rootId = 0;\nvar unsupportedValue = void 0;\nfunction defaultFallbackInView(inView) {\n    unsupportedValue = inView;\n}\nfunction getRootId(root) {\n    if (!root) return \"0\";\n    if (RootIds.has(root)) return RootIds.get(root);\n    rootId += 1;\n    RootIds.set(root, rootId.toString());\n    return RootIds.get(root);\n}\nfunction optionsToId(options) {\n    return Object.keys(options).sort().filter((key)=>options[key] !== void 0).map((key)=>{\n        return `${key}_${key === \"root\" ? getRootId(options.root) : options[key]}`;\n    }).toString();\n}\nfunction createObserver(options) {\n    const id = optionsToId(options);\n    let instance = observerMap.get(id);\n    if (!instance) {\n        const elements = /* @__PURE__ */ new Map();\n        let thresholds;\n        const observer = new IntersectionObserver((entries)=>{\n            entries.forEach((entry)=>{\n                var _a;\n                const inView = entry.isIntersecting && thresholds.some((threshold)=>entry.intersectionRatio >= threshold);\n                if (options.trackVisibility && typeof entry.isVisible === \"undefined\") {\n                    entry.isVisible = inView;\n                }\n                (_a = elements.get(entry.target)) == null ? void 0 : _a.forEach((callback)=>{\n                    callback(inView, entry);\n                });\n            });\n        }, options);\n        thresholds = observer.thresholds || (Array.isArray(options.threshold) ? options.threshold : [\n            options.threshold || 0\n        ]);\n        instance = {\n            id,\n            observer,\n            elements\n        };\n        observerMap.set(id, instance);\n    }\n    return instance;\n}\nfunction observe(element, callback, options = {}, fallbackInView = unsupportedValue) {\n    if (typeof window.IntersectionObserver === \"undefined\" && fallbackInView !== void 0) {\n        const bounds = element.getBoundingClientRect();\n        callback(fallbackInView, {\n            isIntersecting: fallbackInView,\n            target: element,\n            intersectionRatio: typeof options.threshold === \"number\" ? options.threshold : 0,\n            time: 0,\n            boundingClientRect: bounds,\n            intersectionRect: bounds,\n            rootBounds: bounds\n        });\n        return ()=>{};\n    }\n    const { id, observer, elements } = createObserver(options);\n    const callbacks = elements.get(element) || [];\n    if (!elements.has(element)) {\n        elements.set(element, callbacks);\n    }\n    callbacks.push(callback);\n    observer.observe(element);\n    return function unobserve() {\n        callbacks.splice(callbacks.indexOf(callback), 1);\n        if (callbacks.length === 0) {\n            elements.delete(element);\n            observer.unobserve(element);\n        }\n        if (elements.size === 0) {\n            observer.disconnect();\n            observerMap.delete(id);\n        }\n    };\n}\n// src/InView.tsx\nfunction isPlainChildren(props) {\n    return typeof props.children !== \"function\";\n}\nvar InView = class extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n    constructor(props){\n        super(props);\n        __publicField(this, \"node\", null);\n        __publicField(this, \"_unobserveCb\", null);\n        __publicField(this, \"handleNode\", (node)=>{\n            if (this.node) {\n                this.unobserve();\n                if (!node && !this.props.triggerOnce && !this.props.skip) {\n                    this.setState({\n                        inView: !!this.props.initialInView,\n                        entry: void 0\n                    });\n                }\n            }\n            this.node = node ? node : null;\n            this.observeNode();\n        });\n        __publicField(this, \"handleChange\", (inView, entry)=>{\n            if (inView && this.props.triggerOnce) {\n                this.unobserve();\n            }\n            if (!isPlainChildren(this.props)) {\n                this.setState({\n                    inView,\n                    entry\n                });\n            }\n            if (this.props.onChange) {\n                this.props.onChange(inView, entry);\n            }\n        });\n        this.state = {\n            inView: !!props.initialInView,\n            entry: void 0\n        };\n    }\n    componentDidMount() {\n        this.unobserve();\n        this.observeNode();\n    }\n    componentDidUpdate(prevProps) {\n        if (prevProps.rootMargin !== this.props.rootMargin || prevProps.root !== this.props.root || prevProps.threshold !== this.props.threshold || prevProps.skip !== this.props.skip || prevProps.trackVisibility !== this.props.trackVisibility || prevProps.delay !== this.props.delay) {\n            this.unobserve();\n            this.observeNode();\n        }\n    }\n    componentWillUnmount() {\n        this.unobserve();\n    }\n    observeNode() {\n        if (!this.node || this.props.skip) return;\n        const { threshold, root, rootMargin, trackVisibility, delay, fallbackInView } = this.props;\n        this._unobserveCb = observe(this.node, this.handleChange, {\n            threshold,\n            root,\n            rootMargin,\n            // @ts-ignore\n            trackVisibility,\n            // @ts-ignore\n            delay\n        }, fallbackInView);\n    }\n    unobserve() {\n        if (this._unobserveCb) {\n            this._unobserveCb();\n            this._unobserveCb = null;\n        }\n    }\n    render() {\n        const { children } = this.props;\n        if (typeof children === \"function\") {\n            const { inView, entry } = this.state;\n            return children({\n                inView,\n                entry,\n                ref: this.handleNode\n            });\n        }\n        const { as, triggerOnce, threshold, root, rootMargin, onChange, skip, trackVisibility, delay, initialInView, fallbackInView, ...props } = this.props;\n        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(as || \"div\", {\n            ref: this.handleNode,\n            ...props\n        }, children);\n    }\n};\n// src/useInView.tsx\n\nfunction useInView({ threshold, delay, trackVisibility, rootMargin, root, triggerOnce, skip, initialInView, fallbackInView, onChange } = {}) {\n    var _a;\n    const [ref, setRef] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);\n    const callback = react__WEBPACK_IMPORTED_MODULE_0__.useRef();\n    const [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState({\n        inView: !!initialInView,\n        entry: void 0\n    });\n    callback.current = onChange;\n    react__WEBPACK_IMPORTED_MODULE_0__.useEffect({\n        \"useInView.useEffect\": ()=>{\n            if (skip || !ref) return;\n            let unobserve;\n            unobserve = observe(ref, {\n                \"useInView.useEffect\": (inView, entry)=>{\n                    setState({\n                        inView,\n                        entry\n                    });\n                    if (callback.current) callback.current(inView, entry);\n                    if (entry.isIntersecting && triggerOnce && unobserve) {\n                        unobserve();\n                        unobserve = void 0;\n                    }\n                }\n            }[\"useInView.useEffect\"], {\n                root,\n                rootMargin,\n                threshold,\n                // @ts-ignore\n                trackVisibility,\n                // @ts-ignore\n                delay\n            }, fallbackInView);\n            return ({\n                \"useInView.useEffect\": ()=>{\n                    if (unobserve) {\n                        unobserve();\n                    }\n                }\n            })[\"useInView.useEffect\"];\n        }\n    }[\"useInView.useEffect\"], // We break the rule here, because we aren't including the actual `threshold` variable\n    // eslint-disable-next-line react-hooks/exhaustive-deps\n    [\n        // If the threshold is an array, convert it to a string, so it won't change between renders.\n        Array.isArray(threshold) ? threshold.toString() : threshold,\n        ref,\n        root,\n        rootMargin,\n        triggerOnce,\n        skip,\n        trackVisibility,\n        fallbackInView,\n        delay\n    ]);\n    const entryTarget = (_a = state.entry) == null ? void 0 : _a.target;\n    const previousEntryTarget = react__WEBPACK_IMPORTED_MODULE_0__.useRef();\n    if (!ref && entryTarget && !triggerOnce && !skip && previousEntryTarget.current !== entryTarget) {\n        previousEntryTarget.current = entryTarget;\n        setState({\n            inView: !!initialInView,\n            entry: void 0\n        });\n    }\n    const result = [\n        setRef,\n        state.inView,\n        state.entry\n    ];\n    result.ref = result[0];\n    result.inView = result[1];\n    result.entry = result[2];\n    return result;\n}\n //# sourceMappingURL=index.mjs.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3QtaW50ZXJzZWN0aW9uLW9ic2VydmVyL2Rpc3QvaW5kZXgubWpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVCOztBQ0V2QixJQUFNLGNBQWMsb0JBQUksSUFPdEI7QUFFRixJQUFNLFVBQStDLG9CQUFJLFFBQVE7QUFDakUsSUFBSSxTQUFTO0FBRWIsSUFBSSxtQkFBd0M7QUFRckMsU0FBUyxzQkFBc0IsUUFBNkI7SUFDakUsbUJBQW1CO0FBQ3JCO0FBTUEsU0FBUyxVQUFVLE1BQXdDO0lBQ3pELElBQUksQ0FBQyxLQUFNLFFBQU87SUFDbEIsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFHLFFBQU8sUUFBUSxJQUFJLElBQUk7SUFDOUMsVUFBVTtJQUNWLFFBQVEsSUFBSSxNQUFNLE9BQU8sU0FBUyxDQUFDO0lBQ25DLE9BQU8sUUFBUSxJQUFJLElBQUk7QUFDekI7QUFPTyxTQUFTLFlBQVksU0FBbUM7SUFDN0QsT0FBTyxPQUFPLEtBQUssT0FBTyxFQUN2QixLQUFLLEVBQ0wsT0FDQyxDQUFDLE1BQVEsUUFBUSxHQUFxQyxNQUFNLFFBRTdELElBQUksQ0FBQztRQUNKLE9BQU8sR0FBRyxHQUFHLElBQ1gsUUFBUSxTQUNKLFVBQVUsUUFBUSxJQUFJLElBQ3RCLFFBQVEsR0FBcUMsQ0FDbkQ7SUFDRixDQUFDLEVBQ0EsU0FBUztBQUNkO0FBRUEsU0FBUyxlQUFlLFNBQW1DO0lBRXpELE1BQU0sS0FBSyxZQUFZLE9BQU87SUFDOUIsSUFBSSxXQUFXLFlBQVksSUFBSSxFQUFFO0lBRWpDLElBQUksQ0FBQyxVQUFVO1FBRWIsTUFBTSxXQUFXLG9CQUFJLElBQThDO1FBRW5FLElBQUk7UUFFSixNQUFNLFdBQVcsSUFBSSxxQkFBcUIsQ0FBQztZQUN6QyxRQUFRLFFBQVEsQ0FBQztnQkF2RXZCO2dCQTBFUSxNQUFNLFNBQ0osTUFBTSxrQkFDTixXQUFXLEtBQUssQ0FBQyxZQUFjLE1BQU0scUJBQXFCLFNBQVM7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T0FBTyxTQUFTLE9BQU8sQ0FBQztJQUN4QixPQUFPLFFBQVEsT0FBTyxDQUFDO0lBRXZCLE9BQU87QUFDVCIsInNvdXJjZXMiOlsiL1VzZXJzL294eWdlbi9zcmMvSW5WaWV3LnRzeCIsIi9Vc2Vycy9veHlnZW4vc3JjL29ic2VydmUudHMiLCIvVXNlcnMvb3h5Z2VuL3NyYy91c2VJblZpZXcudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBJbnRlcnNlY3Rpb25PYnNlcnZlclByb3BzLCBQbGFpbkNoaWxkcmVuUHJvcHMgfSBmcm9tIFwiLi9pbmRleFwiO1xuaW1wb3J0IHsgb2JzZXJ2ZSB9IGZyb20gXCIuL29ic2VydmVcIjtcblxudHlwZSBTdGF0ZSA9IHtcbiAgaW5WaWV3OiBib29sZWFuO1xuICBlbnRyeT86IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnk7XG59O1xuXG5mdW5jdGlvbiBpc1BsYWluQ2hpbGRyZW4oXG4gIHByb3BzOiBJbnRlcnNlY3Rpb25PYnNlcnZlclByb3BzIHwgUGxhaW5DaGlsZHJlblByb3BzLFxuKTogcHJvcHMgaXMgUGxhaW5DaGlsZHJlblByb3BzIHtcbiAgcmV0dXJuIHR5cGVvZiBwcm9wcy5jaGlsZHJlbiAhPT0gXCJmdW5jdGlvblwiO1xufVxuXG4vKipcbiAjIyBSZW5kZXIgcHJvcHNcblxuIFRvIHVzZSB0aGUgYDxJblZpZXc+YCBjb21wb25lbnQsIHlvdSBwYXNzIGl0IGEgZnVuY3Rpb24uIEl0IHdpbGwgYmUgY2FsbGVkXG4gd2hlbmV2ZXIgdGhlIHN0YXRlIGNoYW5nZXMsIHdpdGggdGhlIG5ldyB2YWx1ZSBvZiBgaW5WaWV3YC4gSW4gYWRkaXRpb24gdG8gdGhlXG4gYGluVmlld2AgcHJvcCwgY2hpbGRyZW4gYWxzbyByZWNlaXZlIGEgYHJlZmAgdGhhdCBzaG91bGQgYmUgc2V0IG9uIHRoZVxuIGNvbnRhaW5pbmcgRE9NIGVsZW1lbnQuIFRoaXMgaXMgdGhlIGVsZW1lbnQgdGhhdCB0aGUgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgd2lsbFxuIG1vbml0b3IuXG5cbiBJZiB5b3UgbmVlZCBpdCwgeW91IGNhbiBhbHNvIGFjY2VzcyB0aGVcbiBbYEludGVyc2VjdGlvbk9ic2VydmVyRW50cnlgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeSlcbiBvbiBgZW50cnlgLCBnaXZpbmcgeW91IGFjY2VzcyB0byBhbGwgdGhlIGRldGFpbHMgYWJvdXQgdGhlIGN1cnJlbnQgaW50ZXJzZWN0aW9uXG4gc3RhdGUuXG5cbiBgYGBqc3hcbiBpbXBvcnQgeyBJblZpZXcgfSBmcm9tICdyZWFjdC1pbnRlcnNlY3Rpb24tb2JzZXJ2ZXInO1xuXG4gY29uc3QgQ29tcG9uZW50ID0gKCkgPT4gKFxuIDxJblZpZXc+XG4geyh7IGluVmlldywgcmVmLCBlbnRyeSB9KSA9PiAoXG4gICAgICA8ZGl2IHJlZj17cmVmfT5cbiAgICAgICAgPGgyPntgSGVhZGVyIGluc2lkZSB2aWV3cG9ydCAke2luVmlld30uYH08L2gyPlxuICAgICAgPC9kaXY+XG4gICAgKX1cbiA8L0luVmlldz5cbiApO1xuXG4gZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50O1xuIGBgYFxuXG4gIyMgUGxhaW4gY2hpbGRyZW5cblxuIFlvdSBjYW4gcGFzcyBhbnkgZWxlbWVudCB0byB0aGUgYDxJblZpZXcgLz5gLCBhbmQgaXQgd2lsbCBoYW5kbGUgY3JlYXRpbmcgdGhlXG4gd3JhcHBpbmcgRE9NIGVsZW1lbnQuIEFkZCBhIGhhbmRsZXIgdG8gdGhlIGBvbkNoYW5nZWAgbWV0aG9kLCBhbmQgY29udHJvbCB0aGVcbiBzdGF0ZSBpbiB5b3VyIG93biBjb21wb25lbnQuIEFueSBleHRyYSBwcm9wcyB5b3UgYWRkIHRvIGA8SW5WaWV3PmAgd2lsbCBiZVxuIHBhc3NlZCB0byB0aGUgSFRNTCBlbGVtZW50LCBhbGxvd2luZyB5b3Ugc2V0IHRoZSBgY2xhc3NOYW1lYCwgYHN0eWxlYCwgZXRjLlxuXG4gYGBganN4XG4gaW1wb3J0IHsgSW5WaWV3IH0gZnJvbSAncmVhY3QtaW50ZXJzZWN0aW9uLW9ic2VydmVyJztcblxuIGNvbnN0IENvbXBvbmVudCA9ICgpID0+IChcbiA8SW5WaWV3IGFzPVwiZGl2XCIgb25DaGFuZ2U9eyhpblZpZXcsIGVudHJ5KSA9PiBjb25zb2xlLmxvZygnSW52aWV3OicsIGluVmlldyl9PlxuIDxoMj5QbGFpbiBjaGlsZHJlbiBhcmUgYWx3YXlzIHJlbmRlcmVkLiBVc2Ugb25DaGFuZ2UgdG8gbW9uaXRvciBzdGF0ZS48L2gyPlxuIDwvSW5WaWV3PlxuICk7XG5cbiBleHBvcnQgZGVmYXVsdCBDb21wb25lbnQ7XG4gYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBJblZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8XG4gIEludGVyc2VjdGlvbk9ic2VydmVyUHJvcHMgfCBQbGFpbkNoaWxkcmVuUHJvcHMsXG4gIFN0YXRlXG4+IHtcbiAgbm9kZTogRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBfdW5vYnNlcnZlQ2I6ICgoKSA9PiB2b2lkKSB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBJbnRlcnNlY3Rpb25PYnNlcnZlclByb3BzIHwgUGxhaW5DaGlsZHJlblByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpblZpZXc6ICEhcHJvcHMuaW5pdGlhbEluVmlldyxcbiAgICAgIGVudHJ5OiB1bmRlZmluZWQsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMudW5vYnNlcnZlKCk7XG4gICAgdGhpcy5vYnNlcnZlTm9kZSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJQcm9wcykge1xuICAgIC8vIElmIGEgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgb3B0aW9uIGNoYW5nZWQsIHJlaW5pdCB0aGUgb2JzZXJ2ZXJcbiAgICBpZiAoXG4gICAgICBwcmV2UHJvcHMucm9vdE1hcmdpbiAhPT0gdGhpcy5wcm9wcy5yb290TWFyZ2luIHx8XG4gICAgICBwcmV2UHJvcHMucm9vdCAhPT0gdGhpcy5wcm9wcy5yb290IHx8XG4gICAgICBwcmV2UHJvcHMudGhyZXNob2xkICE9PSB0aGlzLnByb3BzLnRocmVzaG9sZCB8fFxuICAgICAgcHJldlByb3BzLnNraXAgIT09IHRoaXMucHJvcHMuc2tpcCB8fFxuICAgICAgcHJldlByb3BzLnRyYWNrVmlzaWJpbGl0eSAhPT0gdGhpcy5wcm9wcy50cmFja1Zpc2liaWxpdHkgfHxcbiAgICAgIHByZXZQcm9wcy5kZWxheSAhPT0gdGhpcy5wcm9wcy5kZWxheVxuICAgICkge1xuICAgICAgdGhpcy51bm9ic2VydmUoKTtcbiAgICAgIHRoaXMub2JzZXJ2ZU5vZGUoKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnVub2JzZXJ2ZSgpO1xuICB9XG5cbiAgb2JzZXJ2ZU5vZGUoKSB7XG4gICAgaWYgKCF0aGlzLm5vZGUgfHwgdGhpcy5wcm9wcy5za2lwKSByZXR1cm47XG4gICAgY29uc3Qge1xuICAgICAgdGhyZXNob2xkLFxuICAgICAgcm9vdCxcbiAgICAgIHJvb3RNYXJnaW4sXG4gICAgICB0cmFja1Zpc2liaWxpdHksXG4gICAgICBkZWxheSxcbiAgICAgIGZhbGxiYWNrSW5WaWV3LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgdGhpcy5fdW5vYnNlcnZlQ2IgPSBvYnNlcnZlKFxuICAgICAgdGhpcy5ub2RlLFxuICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UsXG4gICAgICB7XG4gICAgICAgIHRocmVzaG9sZCxcbiAgICAgICAgcm9vdCxcbiAgICAgICAgcm9vdE1hcmdpbixcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0cmFja1Zpc2liaWxpdHksXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZGVsYXksXG4gICAgICB9LFxuICAgICAgZmFsbGJhY2tJblZpZXcsXG4gICAgKTtcbiAgfVxuXG4gIHVub2JzZXJ2ZSgpIHtcbiAgICBpZiAodGhpcy5fdW5vYnNlcnZlQ2IpIHtcbiAgICAgIHRoaXMuX3Vub2JzZXJ2ZUNiKCk7XG4gICAgICB0aGlzLl91bm9ic2VydmVDYiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTm9kZSA9IChub2RlPzogRWxlbWVudCB8IG51bGwpID0+IHtcbiAgICBpZiAodGhpcy5ub2RlKSB7XG4gICAgICAvLyBDbGVhciB0aGUgb2xkIG9ic2VydmVyLCBiZWZvcmUgd2Ugc3RhcnQgb2JzZXJ2aW5nIGEgbmV3IGVsZW1lbnRcbiAgICAgIHRoaXMudW5vYnNlcnZlKCk7XG5cbiAgICAgIGlmICghbm9kZSAmJiAhdGhpcy5wcm9wcy50cmlnZ2VyT25jZSAmJiAhdGhpcy5wcm9wcy5za2lwKSB7XG4gICAgICAgIC8vIFJlc2V0IHRoZSBzdGF0ZSBpZiB3ZSBnZXQgYSBuZXcgbm9kZSwgYW5kIHdlIGFyZW4ndCBpZ25vcmluZyB1cGRhdGVzXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpblZpZXc6ICEhdGhpcy5wcm9wcy5pbml0aWFsSW5WaWV3LCBlbnRyeTogdW5kZWZpbmVkIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubm9kZSA9IG5vZGUgPyBub2RlIDogbnVsbDtcbiAgICB0aGlzLm9ic2VydmVOb2RlKCk7XG4gIH07XG5cbiAgaGFuZGxlQ2hhbmdlID0gKGluVmlldzogYm9vbGVhbiwgZW50cnk6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnkpID0+IHtcbiAgICBpZiAoaW5WaWV3ICYmIHRoaXMucHJvcHMudHJpZ2dlck9uY2UpIHtcbiAgICAgIC8vIElmIGB0cmlnZ2VyT25jZWAgaXMgdHJ1ZSwgd2Ugc2hvdWxkIHN0b3Agb2JzZXJ2aW5nIHRoZSBlbGVtZW50LlxuICAgICAgdGhpcy51bm9ic2VydmUoKTtcbiAgICB9XG4gICAgaWYgKCFpc1BsYWluQ2hpbGRyZW4odGhpcy5wcm9wcykpIHtcbiAgICAgIC8vIFN0b3JlIHRoZSBjdXJyZW50IFN0YXRlLCBzbyB3ZSBjYW4gcGFzcyBpdCB0byB0aGUgY2hpbGRyZW4gaW4gdGhlIG5leHQgcmVuZGVyIHVwZGF0ZVxuICAgICAgLy8gVGhlcmUncyBubyByZWFzb24gdG8gdXBkYXRlIHRoZSBzdGF0ZSBmb3IgcGxhaW4gY2hpbGRyZW4sIHNpbmNlIGl0J3Mgbm90IHVzZWQgaW4gdGhlIHJlbmRlcmluZy5cbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpblZpZXcsIGVudHJ5IH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgLy8gSWYgdGhlIHVzZXIgaXMgYWN0aXZlbHkgbGlzdGVuaW5nIGZvciBvbkNoYW5nZSwgYWx3YXlzIHRyaWdnZXIgaXRcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoaW5WaWV3LCBlbnRyeSk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICh0eXBlb2YgY2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgY29uc3QgeyBpblZpZXcsIGVudHJ5IH0gPSB0aGlzLnN0YXRlO1xuICAgICAgcmV0dXJuIGNoaWxkcmVuKHsgaW5WaWV3LCBlbnRyeSwgcmVmOiB0aGlzLmhhbmRsZU5vZGUgfSk7XG4gICAgfVxuXG4gICAgY29uc3Qge1xuICAgICAgYXMsXG4gICAgICB0cmlnZ2VyT25jZSxcbiAgICAgIHRocmVzaG9sZCxcbiAgICAgIHJvb3QsXG4gICAgICByb290TWFyZ2luLFxuICAgICAgb25DaGFuZ2UsXG4gICAgICBza2lwLFxuICAgICAgdHJhY2tWaXNpYmlsaXR5LFxuICAgICAgZGVsYXksXG4gICAgICBpbml0aWFsSW5WaWV3LFxuICAgICAgZmFsbGJhY2tJblZpZXcsXG4gICAgICAuLi5wcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzIGFzIFBsYWluQ2hpbGRyZW5Qcm9wcztcblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgYXMgfHwgXCJkaXZcIixcbiAgICAgIHsgcmVmOiB0aGlzLmhhbmRsZU5vZGUsIC4uLnByb3BzIH0sXG4gICAgICBjaGlsZHJlbixcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgdHlwZSB7IE9ic2VydmVySW5zdGFuY2VDYWxsYmFjayB9IGZyb20gXCIuL2luZGV4XCI7XG5cbmNvbnN0IG9ic2VydmVyTWFwID0gbmV3IE1hcDxcbiAgc3RyaW5nLFxuICB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XG4gICAgZWxlbWVudHM6IE1hcDxFbGVtZW50LCBBcnJheTxPYnNlcnZlckluc3RhbmNlQ2FsbGJhY2s+PjtcbiAgfVxuPigpO1xuXG5jb25zdCBSb290SWRzOiBXZWFrTWFwPEVsZW1lbnQgfCBEb2N1bWVudCwgc3RyaW5nPiA9IG5ldyBXZWFrTWFwKCk7XG5sZXQgcm9vdElkID0gMDtcblxubGV0IHVuc3VwcG9ydGVkVmFsdWU6IGJvb2xlYW4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cbi8qKlxuICogV2hhdCBzaG91bGQgYmUgdGhlIGRlZmF1bHQgYmVoYXZpb3IgaWYgdGhlIEludGVyc2VjdGlvbk9ic2VydmVyIGlzIHVuc3VwcG9ydGVkP1xuICogSWRlYWxseSB0aGUgcG9seWZpbGwgaGFzIGJlZW4gbG9hZGVkLCB5b3UgY2FuIGhhdmUgdGhlIGZvbGxvd2luZyBoYXBwZW46XG4gKiAtIGB1bmRlZmluZWRgOiBUaHJvdyBhbiBlcnJvclxuICogLSBgdHJ1ZWAgb3IgYGZhbHNlYDogU2V0IHRoZSBgaW5WaWV3YCB2YWx1ZSB0byB0aGlzIHJlZ2FyZGxlc3Mgb2YgaW50ZXJzZWN0aW9uIHN0YXRlXG4gKiAqKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0RmFsbGJhY2tJblZpZXcoaW5WaWV3OiBib29sZWFuIHwgdW5kZWZpbmVkKSB7XG4gIHVuc3VwcG9ydGVkVmFsdWUgPSBpblZpZXc7XG59XG5cbi8qKlxuICogR2VuZXJhdGUgYSB1bmlxdWUgSUQgZm9yIHRoZSByb290IGVsZW1lbnRcbiAqIEBwYXJhbSByb290XG4gKi9cbmZ1bmN0aW9uIGdldFJvb3RJZChyb290OiBJbnRlcnNlY3Rpb25PYnNlcnZlckluaXRbXCJyb290XCJdKSB7XG4gIGlmICghcm9vdCkgcmV0dXJuIFwiMFwiO1xuICBpZiAoUm9vdElkcy5oYXMocm9vdCkpIHJldHVybiBSb290SWRzLmdldChyb290KTtcbiAgcm9vdElkICs9IDE7XG4gIFJvb3RJZHMuc2V0KHJvb3QsIHJvb3RJZC50b1N0cmluZygpKTtcbiAgcmV0dXJuIFJvb3RJZHMuZ2V0KHJvb3QpO1xufVxuXG4vKipcbiAqIENvbnZlcnQgdGhlIG9wdGlvbnMgdG8gYSBzdHJpbmcgSWQsIGJhc2VkIG9uIHRoZSB2YWx1ZXMuXG4gKiBFbnN1cmVzIHdlIGNhbiByZXVzZSB0aGUgc2FtZSBvYnNlcnZlciB3aGVuIG9ic2VydmluZyBlbGVtZW50cyB3aXRoIHRoZSBzYW1lIG9wdGlvbnMuXG4gKiBAcGFyYW0gb3B0aW9uc1xuICovXG5leHBvcnQgZnVuY3Rpb24gb3B0aW9uc1RvSWQob3B0aW9uczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0KSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvcHRpb25zKVxuICAgIC5zb3J0KClcbiAgICAuZmlsdGVyKFxuICAgICAgKGtleSkgPT4gb3B0aW9uc1trZXkgYXMga2V5b2YgSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0XSAhPT0gdW5kZWZpbmVkLFxuICAgIClcbiAgICAubWFwKChrZXkpID0+IHtcbiAgICAgIHJldHVybiBgJHtrZXl9XyR7XG4gICAgICAgIGtleSA9PT0gXCJyb290XCJcbiAgICAgICAgICA/IGdldFJvb3RJZChvcHRpb25zLnJvb3QpXG4gICAgICAgICAgOiBvcHRpb25zW2tleSBhcyBrZXlvZiBJbnRlcnNlY3Rpb25PYnNlcnZlckluaXRdXG4gICAgICB9YDtcbiAgICB9KVxuICAgIC50b1N0cmluZygpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVPYnNlcnZlcihvcHRpb25zOiBJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQpIHtcbiAgLy8gQ3JlYXRlIGEgdW5pcXVlIElEIGZvciB0aGlzIG9ic2VydmVyIGluc3RhbmNlLCBiYXNlZCBvbiB0aGUgcm9vdCwgcm9vdCBtYXJnaW4gYW5kIHRocmVzaG9sZC5cbiAgY29uc3QgaWQgPSBvcHRpb25zVG9JZChvcHRpb25zKTtcbiAgbGV0IGluc3RhbmNlID0gb2JzZXJ2ZXJNYXAuZ2V0KGlkKTtcblxuICBpZiAoIWluc3RhbmNlKSB7XG4gICAgLy8gQ3JlYXRlIGEgbWFwIG9mIGVsZW1lbnRzIHRoaXMgb2JzZXJ2ZXIgaXMgZ29pbmcgdG8gb2JzZXJ2ZS4gRWFjaCBlbGVtZW50IGhhcyBhIGxpc3Qgb2YgY2FsbGJhY2tzIHRoYXQgc2hvdWxkIGJlIHRyaWdnZXJlZCwgb25jZSBpdCBjb21lcyBpbnRvIHZpZXcuXG4gICAgY29uc3QgZWxlbWVudHMgPSBuZXcgTWFwPEVsZW1lbnQsIEFycmF5PE9ic2VydmVySW5zdGFuY2VDYWxsYmFjaz4+KCk7XG4gICAgLy8gYmlvbWUtaWdub3JlIGxpbnQvc3R5bGUvdXNlQ29uc3Q6IEl0J3MgZmluZSB0byB1c2UgbGV0IGhlcmUsIGFzIHdlIGFyZSBnb2luZyB0byBhc3NpZ24gaXQgbGF0ZXJcbiAgICBsZXQgdGhyZXNob2xkczogbnVtYmVyW10gfCByZWFkb25seSBudW1iZXJbXTtcblxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgIC8vIFdoaWxlIGl0IHdvdWxkIGJlIG5pY2UgaWYgeW91IGNvdWxkIGp1c3QgbG9vayBhdCBpc0ludGVyc2VjdGluZyB0byBkZXRlcm1pbmUgaWYgdGhlIGNvbXBvbmVudCBpcyBpbnNpZGUgdGhlIHZpZXdwb3J0LCBicm93c2VycyBjYW4ndCBhZ3JlZSBvbiBob3cgdG8gdXNlIGl0LlxuICAgICAgICAvLyAtRmlyZWZveCBpZ25vcmVzIGB0aHJlc2hvbGRgIHdoZW4gY29uc2lkZXJpbmcgYGlzSW50ZXJzZWN0aW5nYCwgc28gaXQgd2lsbCBuZXZlciBiZSBmYWxzZSBhZ2FpbiBpZiBgdGhyZXNob2xkYCBpcyA+IDBcbiAgICAgICAgY29uc3QgaW5WaWV3ID1cbiAgICAgICAgICBlbnRyeS5pc0ludGVyc2VjdGluZyAmJlxuICAgICAgICAgIHRocmVzaG9sZHMuc29tZSgodGhyZXNob2xkKSA9PiBlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyA+PSB0aHJlc2hvbGQpO1xuXG4gICAgICAgIC8vIEB0cy1pZ25vcmUgc3VwcG9ydCBJbnRlcnNlY3Rpb25PYnNlcnZlciB2MlxuICAgICAgICBpZiAob3B0aW9ucy50cmFja1Zpc2liaWxpdHkgJiYgdHlwZW9mIGVudHJ5LmlzVmlzaWJsZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIC8vIFRoZSBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBJbnRlcnNlY3Rpb24gT2JzZXJ2ZXIgdjIsIGZhbGxpbmcgYmFjayB0byB2MSBiZWhhdmlvci5cbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgZW50cnkuaXNWaXNpYmxlID0gaW5WaWV3O1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudHMuZ2V0KGVudHJ5LnRhcmdldCk/LmZvckVhY2goKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2soaW5WaWV3LCBlbnRyeSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSwgb3B0aW9ucyk7XG5cbiAgICAvLyBFbnN1cmUgd2UgaGF2ZSBhIHZhbGlkIHRocmVzaG9sZHMgYXJyYXkuIElmIG5vdCwgdXNlIHRoZSB0aHJlc2hvbGQgZnJvbSB0aGUgb3B0aW9uc1xuICAgIHRocmVzaG9sZHMgPVxuICAgICAgb2JzZXJ2ZXIudGhyZXNob2xkcyB8fFxuICAgICAgKEFycmF5LmlzQXJyYXkob3B0aW9ucy50aHJlc2hvbGQpXG4gICAgICAgID8gb3B0aW9ucy50aHJlc2hvbGRcbiAgICAgICAgOiBbb3B0aW9ucy50aHJlc2hvbGQgfHwgMF0pO1xuXG4gICAgaW5zdGFuY2UgPSB7XG4gICAgICBpZCxcbiAgICAgIG9ic2VydmVyLFxuICAgICAgZWxlbWVudHMsXG4gICAgfTtcblxuICAgIG9ic2VydmVyTWFwLnNldChpZCwgaW5zdGFuY2UpO1xuICB9XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vKipcbiAqIEBwYXJhbSBlbGVtZW50IC0gRE9NIEVsZW1lbnQgdG8gb2JzZXJ2ZVxuICogQHBhcmFtIGNhbGxiYWNrIC0gQ2FsbGJhY2sgZnVuY3Rpb24gdG8gdHJpZ2dlciB3aGVuIGludGVyc2VjdGlvbiBzdGF0dXMgY2hhbmdlc1xuICogQHBhcmFtIG9wdGlvbnMgLSBJbnRlcnNlY3Rpb24gT2JzZXJ2ZXIgb3B0aW9uc1xuICogQHBhcmFtIGZhbGxiYWNrSW5WaWV3IC0gRmFsbGJhY2sgaW5WaWV3IHZhbHVlLlxuICogQHJldHVybiBGdW5jdGlvbiAtIENsZWFudXAgZnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgdHJpZ2dlcmVkIHRvIHVucmVnaXN0ZXIgdGhlIG9ic2VydmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZlKFxuICBlbGVtZW50OiBFbGVtZW50LFxuICBjYWxsYmFjazogT2JzZXJ2ZXJJbnN0YW5jZUNhbGxiYWNrLFxuICBvcHRpb25zOiBJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQgPSB7fSxcbiAgZmFsbGJhY2tJblZpZXcgPSB1bnN1cHBvcnRlZFZhbHVlLFxuKSB7XG4gIGlmIChcbiAgICB0eXBlb2Ygd2luZG93LkludGVyc2VjdGlvbk9ic2VydmVyID09PSBcInVuZGVmaW5lZFwiICYmXG4gICAgZmFsbGJhY2tJblZpZXcgIT09IHVuZGVmaW5lZFxuICApIHtcbiAgICBjb25zdCBib3VuZHMgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNhbGxiYWNrKGZhbGxiYWNrSW5WaWV3LCB7XG4gICAgICBpc0ludGVyc2VjdGluZzogZmFsbGJhY2tJblZpZXcsXG4gICAgICB0YXJnZXQ6IGVsZW1lbnQsXG4gICAgICBpbnRlcnNlY3Rpb25SYXRpbzpcbiAgICAgICAgdHlwZW9mIG9wdGlvbnMudGhyZXNob2xkID09PSBcIm51bWJlclwiID8gb3B0aW9ucy50aHJlc2hvbGQgOiAwLFxuICAgICAgdGltZTogMCxcbiAgICAgIGJvdW5kaW5nQ2xpZW50UmVjdDogYm91bmRzLFxuICAgICAgaW50ZXJzZWN0aW9uUmVjdDogYm91bmRzLFxuICAgICAgcm9vdEJvdW5kczogYm91bmRzLFxuICAgIH0pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAvLyBOb3RoaW5nIHRvIGNsZWFudXBcbiAgICB9O1xuICB9XG4gIC8vIEFuIG9ic2VydmVyIHdpdGggdGhlIHNhbWUgb3B0aW9ucyBjYW4gYmUgcmV1c2VkLCBzbyBsZXRzIHVzZSB0aGlzIGZhY3RcbiAgY29uc3QgeyBpZCwgb2JzZXJ2ZXIsIGVsZW1lbnRzIH0gPSBjcmVhdGVPYnNlcnZlcihvcHRpb25zKTtcblxuICAvLyBSZWdpc3RlciB0aGUgY2FsbGJhY2sgbGlzdGVuZXIgZm9yIHRoaXMgZWxlbWVudFxuICBjb25zdCBjYWxsYmFja3MgPSBlbGVtZW50cy5nZXQoZWxlbWVudCkgfHwgW107XG4gIGlmICghZWxlbWVudHMuaGFzKGVsZW1lbnQpKSB7XG4gICAgZWxlbWVudHMuc2V0KGVsZW1lbnQsIGNhbGxiYWNrcyk7XG4gIH1cblxuICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudCk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVub2JzZXJ2ZSgpIHtcbiAgICAvLyBSZW1vdmUgdGhlIGNhbGxiYWNrIGZyb20gdGhlIGNhbGxiYWNrIGxpc3RcbiAgICBjYWxsYmFja3Muc3BsaWNlKGNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKSwgMSk7XG5cbiAgICBpZiAoY2FsbGJhY2tzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gTm8gbW9yZSBjYWxsYmFjayBleGlzdHMgZm9yIGVsZW1lbnQsIHNvIGRlc3Ryb3kgaXRcbiAgICAgIGVsZW1lbnRzLmRlbGV0ZShlbGVtZW50KTtcbiAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZShlbGVtZW50KTtcbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudHMuc2l6ZSA9PT0gMCkge1xuICAgICAgLy8gTm8gbW9yZSBlbGVtZW50cyBhcmUgYmVpbmcgb2JzZXJ2ZXIgYnkgdGhpcyBpbnN0YW5jZSwgc28gZGVzdHJveSBpdFxuICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgb2JzZXJ2ZXJNYXAuZGVsZXRlKGlkKTtcbiAgICB9XG4gIH07XG59XG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgSW5WaWV3SG9va1Jlc3BvbnNlLCBJbnRlcnNlY3Rpb25PcHRpb25zIH0gZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCB7IG9ic2VydmUgfSBmcm9tIFwiLi9vYnNlcnZlXCI7XG5cbnR5cGUgU3RhdGUgPSB7XG4gIGluVmlldzogYm9vbGVhbjtcbiAgZW50cnk/OiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5O1xufTtcblxuLyoqXG4gKiBSZWFjdCBIb29rcyBtYWtlIGl0IGVhc3kgdG8gbW9uaXRvciB0aGUgYGluVmlld2Agc3RhdGUgb2YgeW91ciBjb21wb25lbnRzLiBDYWxsXG4gKiB0aGUgYHVzZUluVmlld2AgaG9vayB3aXRoIHRoZSAob3B0aW9uYWwpIFtvcHRpb25zXSgjb3B0aW9ucykgeW91IG5lZWQuIEl0IHdpbGxcbiAqIHJldHVybiBhbiBhcnJheSBjb250YWluaW5nIGEgYHJlZmAsIHRoZSBgaW5WaWV3YCBzdGF0dXMgYW5kIHRoZSBjdXJyZW50XG4gKiBbYGVudHJ5YF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0ludGVyc2VjdGlvbk9ic2VydmVyRW50cnkpLlxuICogQXNzaWduIHRoZSBgcmVmYCB0byB0aGUgRE9NIGVsZW1lbnQgeW91IHdhbnQgdG8gbW9uaXRvciwgYW5kIHRoZSBob29rIHdpbGxcbiAqIHJlcG9ydCB0aGUgc3RhdHVzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBqc3hcbiAqIGltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG4gKiBpbXBvcnQgeyB1c2VJblZpZXcgfSBmcm9tICdyZWFjdC1pbnRlcnNlY3Rpb24tb2JzZXJ2ZXInO1xuICpcbiAqIGNvbnN0IENvbXBvbmVudCA9ICgpID0+IHtcbiAqICAgY29uc3QgeyByZWYsIGluVmlldywgZW50cnkgfSA9IHVzZUluVmlldyh7XG4gKiAgICAgICB0aHJlc2hvbGQ6IDAsXG4gKiAgIH0pO1xuICpcbiAqICAgcmV0dXJuIChcbiAqICAgICA8ZGl2IHJlZj17cmVmfT5cbiAqICAgICAgIDxoMj57YEhlYWRlciBpbnNpZGUgdmlld3BvcnQgJHtpblZpZXd9LmB9PC9oMj5cbiAqICAgICA8L2Rpdj5cbiAqICAgKTtcbiAqIH07XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUluVmlldyh7XG4gIHRocmVzaG9sZCxcbiAgZGVsYXksXG4gIHRyYWNrVmlzaWJpbGl0eSxcbiAgcm9vdE1hcmdpbixcbiAgcm9vdCxcbiAgdHJpZ2dlck9uY2UsXG4gIHNraXAsXG4gIGluaXRpYWxJblZpZXcsXG4gIGZhbGxiYWNrSW5WaWV3LFxuICBvbkNoYW5nZSxcbn06IEludGVyc2VjdGlvbk9wdGlvbnMgPSB7fSk6IEluVmlld0hvb2tSZXNwb25zZSB7XG4gIGNvbnN0IFtyZWYsIHNldFJlZl0gPSBSZWFjdC51c2VTdGF0ZTxFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGNhbGxiYWNrID0gUmVhY3QudXNlUmVmPEludGVyc2VjdGlvbk9wdGlvbnNbXCJvbkNoYW5nZVwiXT4oKTtcbiAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSBSZWFjdC51c2VTdGF0ZTxTdGF0ZT4oe1xuICAgIGluVmlldzogISFpbml0aWFsSW5WaWV3LFxuICAgIGVudHJ5OiB1bmRlZmluZWQsXG4gIH0pO1xuXG4gIC8vIFN0b3JlIHRoZSBvbkNoYW5nZSBjYWxsYmFjayBpbiBhIGByZWZgLCBzbyB3ZSBjYW4gYWNjZXNzIHRoZSBsYXRlc3QgaW5zdGFuY2VcbiAgLy8gaW5zaWRlIHRoZSBgdXNlRWZmZWN0YCwgYnV0IHdpdGhvdXQgdHJpZ2dlcmluZyBhIHJlcmVuZGVyLlxuICBjYWxsYmFjay5jdXJyZW50ID0gb25DaGFuZ2U7XG5cbiAgLy8gYmlvbWUtaWdub3JlIGxpbnQvY29ycmVjdG5lc3MvdXNlRXhoYXVzdGl2ZURlcGVuZGVuY2llczogdGhyZXNob2xkIGlzIG5vdCBjb3JyZWN0bHkgZGV0ZWN0ZWQgYXMgYSBkZXBlbmRlbmN5XG4gIFJlYWN0LnVzZUVmZmVjdChcbiAgICAoKSA9PiB7XG4gICAgICAvLyBFbnN1cmUgd2UgaGF2ZSBub2RlIHJlZiwgYW5kIHRoYXQgd2Ugc2hvdWxkbid0IHNraXAgb2JzZXJ2aW5nXG4gICAgICBpZiAoc2tpcCB8fCAhcmVmKSByZXR1cm47XG5cbiAgICAgIGxldCB1bm9ic2VydmU6ICgoKSA9PiB2b2lkKSB8IHVuZGVmaW5lZDtcbiAgICAgIHVub2JzZXJ2ZSA9IG9ic2VydmUoXG4gICAgICAgIHJlZixcbiAgICAgICAgKGluVmlldywgZW50cnkpID0+IHtcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBpblZpZXcsXG4gICAgICAgICAgICBlbnRyeSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoY2FsbGJhY2suY3VycmVudCkgY2FsbGJhY2suY3VycmVudChpblZpZXcsIGVudHJ5KTtcblxuICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZyAmJiB0cmlnZ2VyT25jZSAmJiB1bm9ic2VydmUpIHtcbiAgICAgICAgICAgIC8vIElmIGl0IHNob3VsZCBvbmx5IHRyaWdnZXIgb25jZSwgdW5vYnNlcnZlIHRoZSBlbGVtZW50IGFmdGVyIGl0J3MgaW5WaWV3XG4gICAgICAgICAgICB1bm9ic2VydmUoKTtcbiAgICAgICAgICAgIHVub2JzZXJ2ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICByb290LFxuICAgICAgICAgIHJvb3RNYXJnaW4sXG4gICAgICAgICAgdGhyZXNob2xkLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICB0cmFja1Zpc2liaWxpdHksXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIGRlbGF5LFxuICAgICAgICB9LFxuICAgICAgICBmYWxsYmFja0luVmlldyxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmICh1bm9ic2VydmUpIHtcbiAgICAgICAgICB1bm9ic2VydmUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuICAgIC8vIFdlIGJyZWFrIHRoZSBydWxlIGhlcmUsIGJlY2F1c2Ugd2UgYXJlbid0IGluY2x1ZGluZyB0aGUgYWN0dWFsIGB0aHJlc2hvbGRgIHZhcmlhYmxlXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL2V4aGF1c3RpdmUtZGVwc1xuICAgIFtcbiAgICAgIC8vIElmIHRoZSB0aHJlc2hvbGQgaXMgYW4gYXJyYXksIGNvbnZlcnQgaXQgdG8gYSBzdHJpbmcsIHNvIGl0IHdvbid0IGNoYW5nZSBiZXR3ZWVuIHJlbmRlcnMuXG4gICAgICBBcnJheS5pc0FycmF5KHRocmVzaG9sZCkgPyB0aHJlc2hvbGQudG9TdHJpbmcoKSA6IHRocmVzaG9sZCxcbiAgICAgIHJlZixcbiAgICAgIHJvb3QsXG4gICAgICByb290TWFyZ2luLFxuICAgICAgdHJpZ2dlck9uY2UsXG4gICAgICBza2lwLFxuICAgICAgdHJhY2tWaXNpYmlsaXR5LFxuICAgICAgZmFsbGJhY2tJblZpZXcsXG4gICAgICBkZWxheSxcbiAgICBdLFxuICApO1xuXG4gIGNvbnN0IGVudHJ5VGFyZ2V0ID0gc3RhdGUuZW50cnk/LnRhcmdldDtcbiAgY29uc3QgcHJldmlvdXNFbnRyeVRhcmdldCA9IFJlYWN0LnVzZVJlZjxFbGVtZW50PigpO1xuICBpZiAoXG4gICAgIXJlZiAmJlxuICAgIGVudHJ5VGFyZ2V0ICYmXG4gICAgIXRyaWdnZXJPbmNlICYmXG4gICAgIXNraXAgJiZcbiAgICBwcmV2aW91c0VudHJ5VGFyZ2V0LmN1cnJlbnQgIT09IGVudHJ5VGFyZ2V0XG4gICkge1xuICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYSBub2RlIHJlZiwgdGhlbiByZXNldCB0aGUgc3RhdGUgKHVubGVzcyB0aGUgaG9vayBpcyBzZXQgdG8gb25seSBgdHJpZ2dlck9uY2VgIG9yIGBza2lwYClcbiAgICAvLyBUaGlzIGVuc3VyZXMgd2UgY29ycmVjdGx5IHJlZmxlY3QgdGhlIGN1cnJlbnQgc3RhdGUgLSBJZiB5b3UgYXJlbid0IG9ic2VydmluZyBhbnl0aGluZywgdGhlbiBub3RoaW5nIGlzIGluVmlld1xuICAgIHByZXZpb3VzRW50cnlUYXJnZXQuY3VycmVudCA9IGVudHJ5VGFyZ2V0O1xuICAgIHNldFN0YXRlKHtcbiAgICAgIGluVmlldzogISFpbml0aWFsSW5WaWV3LFxuICAgICAgZW50cnk6IHVuZGVmaW5lZCxcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IHJlc3VsdCA9IFtzZXRSZWYsIHN0YXRlLmluVmlldywgc3RhdGUuZW50cnldIGFzIEluVmlld0hvb2tSZXNwb25zZTtcblxuICAvLyBTdXBwb3J0IG9iamVjdCBkZXN0cnVjdHVyaW5nLCBieSBhZGRpbmcgdGhlIHNwZWNpZmljIHZhbHVlcy5cbiAgcmVzdWx0LnJlZiA9IHJlc3VsdFswXTtcbiAgcmVzdWx0LmluVmlldyA9IHJlc3VsdFsxXTtcbiAgcmVzdWx0LmVudHJ5ID0gcmVzdWx0WzJdO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iXSwibmFtZXMiOlsiUmVhY3QiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-intersection-observer/dist/index.mjs\n");

/***/ })

};
;