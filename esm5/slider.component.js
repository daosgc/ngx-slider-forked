/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ViewChild, HostBinding, HostListener, Input, ElementRef, Renderer2, EventEmitter, Output, ContentChild, TemplateRef, ChangeDetectorRef, forwardRef, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, throttleTime, tap } from 'rxjs/operators';
import detectPassiveEvents from 'detect-passive-events';
import { Options, LabelType } from './options';
import { PointerType } from './pointer-type';
import { ChangeContext } from './change-context';
import { ValueHelper } from './value-helper';
import { CompatibilityHelper } from './compatibility-helper';
import { MathHelper } from './math-helper';
import { EventListenerHelper } from './event-listener-helper';
import { SliderElementDirective } from './slider-element.directive';
import { SliderHandleDirective } from './slider-handle.directive';
import { SliderLabelDirective } from './slider-label.directive';
var Tick = /** @class */ (function () {
    function Tick() {
        this.selected = false;
        this.style = {};
        this.tooltip = null;
        this.tooltipPlacement = null;
        this.value = null;
        this.valueTooltip = null;
        this.valueTooltipPlacement = null;
        this.legend = null;
    }
    return Tick;
}());
export { Tick };
if (false) {
    /** @type {?} */
    Tick.prototype.selected;
    /** @type {?} */
    Tick.prototype.style;
    /** @type {?} */
    Tick.prototype.tooltip;
    /** @type {?} */
    Tick.prototype.tooltipPlacement;
    /** @type {?} */
    Tick.prototype.value;
    /** @type {?} */
    Tick.prototype.valueTooltip;
    /** @type {?} */
    Tick.prototype.valueTooltipPlacement;
    /** @type {?} */
    Tick.prototype.legend;
}
var Dragging = /** @class */ (function () {
    function Dragging() {
        this.active = false;
        this.value = 0;
        this.difference = 0;
        this.position = 0;
        this.lowLimit = 0;
        this.highLimit = 0;
    }
    return Dragging;
}());
if (false) {
    /** @type {?} */
    Dragging.prototype.active;
    /** @type {?} */
    Dragging.prototype.value;
    /** @type {?} */
    Dragging.prototype.difference;
    /** @type {?} */
    Dragging.prototype.position;
    /** @type {?} */
    Dragging.prototype.lowLimit;
    /** @type {?} */
    Dragging.prototype.highLimit;
}
var ModelValues = /** @class */ (function () {
    function ModelValues() {
    }
    /**
     * @param {?=} x
     * @param {?=} y
     * @return {?}
     */
    ModelValues.compare = /**
     * @param {?=} x
     * @param {?=} y
     * @return {?}
     */
    function (x, y) {
        if (ValueHelper.isNullOrUndefined(x) && ValueHelper.isNullOrUndefined(y)) {
            return false;
        }
        if (ValueHelper.isNullOrUndefined(x) !== ValueHelper.isNullOrUndefined(y)) {
            return false;
        }
        return x.value === y.value && x.highValue === y.highValue;
    };
    return ModelValues;
}());
if (false) {
    /** @type {?} */
    ModelValues.prototype.value;
    /** @type {?} */
    ModelValues.prototype.highValue;
}
var ModelChange = /** @class */ (function (_super) {
    tslib_1.__extends(ModelChange, _super);
    function ModelChange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?=} x
     * @param {?=} y
     * @return {?}
     */
    ModelChange.compare = /**
     * @param {?=} x
     * @param {?=} y
     * @return {?}
     */
    function (x, y) {
        if (ValueHelper.isNullOrUndefined(x) && ValueHelper.isNullOrUndefined(y)) {
            return false;
        }
        if (ValueHelper.isNullOrUndefined(x) !== ValueHelper.isNullOrUndefined(y)) {
            return false;
        }
        return x.value === y.value &&
            x.highValue === y.highValue &&
            x.forceChange === y.forceChange;
    };
    return ModelChange;
}(ModelValues));
if (false) {
    /** @type {?} */
    ModelChange.prototype.forceChange;
}
var InputModelChange = /** @class */ (function (_super) {
    tslib_1.__extends(InputModelChange, _super);
    function InputModelChange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InputModelChange;
}(ModelChange));
if (false) {
    /** @type {?} */
    InputModelChange.prototype.internalChange;
}
var OutputModelChange = /** @class */ (function (_super) {
    tslib_1.__extends(OutputModelChange, _super);
    function OutputModelChange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return OutputModelChange;
}(ModelChange));
if (false) {
    /** @type {?} */
    OutputModelChange.prototype.userEventInitiated;
}
/** @type {?} */
var NGX_SLIDER_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    /* tslint:disable-next-line: no-use-before-declare */
    useExisting: forwardRef(function () { return SliderComponent; }),
    multi: true,
};
var SliderComponent = /** @class */ (function () {
    function SliderComponent(renderer, elementRef, changeDetectionRef, zone) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.changeDetectionRef = changeDetectionRef;
        this.zone = zone;
        // Model for low value of slider. For simple slider, this is the only input. For range slider, this is the low value.
        this.value = null;
        // Output for low value slider to support two-way bindings
        this.valueChange = new EventEmitter();
        // Model for high value of slider. Not used in simple slider. For range slider, this is the high value.
        this.highValue = null;
        // Output for high value slider to support two-way bindings
        this.highValueChange = new EventEmitter();
        // An object with all the other options of the slider.
        // Each option can be updated at runtime and the slider will automatically be re-rendered.
        this.options = new Options();
        // Event emitted when user starts interaction with the slider
        this.userChangeStart = new EventEmitter();
        // Event emitted on each change coming from user interaction
        this.userChange = new EventEmitter();
        // Event emitted when user finishes interaction with the slider
        this.userChangeEnd = new EventEmitter();
        this.initHasRun = false;
        this.inputModelChangeSubject = new Subject();
        this.inputModelChangeSubscription = null;
        this.outputModelChangeSubject = new Subject();
        this.outputModelChangeSubscription = null;
        this.viewLowValue = null;
        this.viewHighValue = null;
        this.viewOptions = new Options();
        this.handleHalfDimension = 0;
        this.maxHandlePosition = 0;
        this.currentTrackingPointer = null;
        this.currentFocusPointer = null;
        this.firstKeyDown = false;
        this.touchId = null;
        this.dragging = new Dragging();
        // Host element class bindings
        this.sliderElementVerticalClass = false;
        this.sliderElementAnimateClass = false;
        this.sliderElementWithLegendClass = false;
        this.sliderElementDisabledAttr = null;
        this.barStyle = {};
        this.minPointerStyle = {};
        this.maxPointerStyle = {};
        this.fullBarTransparentClass = false;
        this.selectionBarDraggableClass = false;
        this.ticksUnderValuesClass = false;
        this.intermediateTicks = false;
        this.ticks = [];
        this.eventListenerHelper = null;
        this.onMoveEventListener = null;
        this.onEndEventListener = null;
        this.moving = false;
        this.resizeObserver = null;
        this.onTouchedCallback = null;
        this.onChangeCallback = null;
        this.eventListenerHelper = new EventListenerHelper(this.renderer);
    }
    Object.defineProperty(SliderComponent.prototype, "manualRefresh", {
        // Input event that triggers slider refresh (re-positioning of slider elements)
        set: /**
         * @param {?} manualRefresh
         * @return {?}
         */
        function (manualRefresh) {
            var _this = this;
            this.unsubscribeManualRefresh();
            this.manualRefreshSubscription = manualRefresh.subscribe(function () {
                setTimeout(function () { return _this.calculateViewDimensionsAndDetectChanges(); });
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "triggerFocus", {
        // Input event that triggers setting focus on given slider handle
        set: /**
         * @param {?} triggerFocus
         * @return {?}
         */
        function (triggerFocus) {
            var _this = this;
            this.unsubscribeTriggerFocus();
            this.triggerFocusSubscription = triggerFocus.subscribe(function (pointerType) {
                _this.focusPointer(pointerType);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "range", {
        get: /**
         * @return {?}
         */
        function () {
            return !ValueHelper.isNullOrUndefined(this.value) && !ValueHelper.isNullOrUndefined(this.highValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "showTicks", {
        get: /**
         * @return {?}
         */
        function () {
            return this.viewOptions.showTicks;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SliderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.viewOptions = new Options();
        Object.assign(this.viewOptions, this.options);
        // We need to run these two things first, before the rest of the init in ngAfterViewInit(),
        // because these two settings are set through @HostBinding and Angular change detection
        // mechanism doesn't like them changing in ngAfterViewInit()
        this.updateDisabledState();
        this.updateVerticalState();
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.applyOptions();
        this.subscribeInputModelChangeSubject(this.viewOptions.inputEventsInterval);
        this.subscribeOutputModelChangeSubject(this.viewOptions.outputEventsInterval);
        // Once we apply options, we need to normalise model values for the first time
        this.renormaliseModelValues();
        this.viewLowValue = this.modelValueToViewValue(this.value);
        if (this.range) {
            this.viewHighValue = this.modelValueToViewValue(this.highValue);
        }
        else {
            this.viewHighValue = null;
        }
        this.updateVerticalState(); // need to run this again to cover changes to slider elements
        this.manageElementsStyle();
        this.updateDisabledState();
        this.calculateViewDimensions();
        this.addAccessibility();
        this.updateCeilLabel();
        this.updateFloorLabel();
        this.initHandles();
        this.manageEventsBindings();
        this.subscribeResizeObserver();
        this.initHasRun = true;
        // Run change detection manually to resolve some issues when init procedure changes values used in the view
        if (!this.isRefDestroyed()) {
            this.changeDetectionRef.detectChanges();
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    SliderComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // Always apply options first
        if (!ValueHelper.isNullOrUndefined(changes["options"])) {
            this.onChangeOptions();
        }
        // Then value changes
        if (!ValueHelper.isNullOrUndefined(changes["value"]) ||
            !ValueHelper.isNullOrUndefined(changes["highValue"])) {
            this.inputModelChangeSubject.next({
                value: this.value,
                highValue: this.highValue,
                forceChange: false,
                internalChange: false
            });
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unbindEvents();
        this.unsubscribeResizeObserver();
        this.unsubscribeInputModelChangeSubject();
        this.unsubscribeOutputModelChangeSubject();
        this.unsubscribeManualRefresh();
        this.unsubscribeTriggerFocus();
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    SliderComponent.prototype.writeValue = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        if (obj instanceof Array) {
            this.value = obj[0];
            this.highValue = obj[1];
        }
        else {
            this.value = obj;
        }
        // ngOnChanges() is not called in this instance, so we need to communicate the change manually
        this.inputModelChangeSubject.next({
            value: this.value,
            highValue: this.highValue,
            forceChange: false,
            internalChange: false
        });
    };
    /**
     * @param {?} onChangeCallback
     * @return {?}
     */
    SliderComponent.prototype.registerOnChange = /**
     * @param {?} onChangeCallback
     * @return {?}
     */
    function (onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
    };
    /**
     * @param {?} onTouchedCallback
     * @return {?}
     */
    SliderComponent.prototype.registerOnTouched = /**
     * @param {?} onTouchedCallback
     * @return {?}
     */
    function (onTouchedCallback) {
        this.onTouchedCallback = onTouchedCallback;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    SliderComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.viewOptions.disabled = isDisabled;
        this.updateDisabledState();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SliderComponent.prototype.onResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.calculateViewDimensionsAndDetectChanges();
    };
    /**
     * @param {?=} interval
     * @return {?}
     */
    SliderComponent.prototype.subscribeInputModelChangeSubject = /**
     * @param {?=} interval
     * @return {?}
     */
    function (interval) {
        var _this = this;
        this.inputModelChangeSubscription = this.inputModelChangeSubject
            .pipe(distinctUntilChanged(ModelChange.compare), 
        // Hack to reset the status of the distinctUntilChanged() - if a "fake" event comes through with forceChange=true,
        // we forcefully by-pass distinctUntilChanged(), but otherwise drop the event
        filter(function (modelChange) { return !modelChange.forceChange && !modelChange.internalChange; }), (!ValueHelper.isNullOrUndefined(interval))
            ? throttleTime(interval, undefined, { leading: true, trailing: true })
            : tap(function () { }) // no-op
        )
            .subscribe(function (modelChange) { return _this.applyInputModelChange(modelChange); });
    };
    /**
     * @param {?=} interval
     * @return {?}
     */
    SliderComponent.prototype.subscribeOutputModelChangeSubject = /**
     * @param {?=} interval
     * @return {?}
     */
    function (interval) {
        var _this = this;
        this.outputModelChangeSubscription = this.outputModelChangeSubject
            .pipe(distinctUntilChanged(ModelChange.compare), (!ValueHelper.isNullOrUndefined(interval))
            ? throttleTime(interval, undefined, { leading: true, trailing: true })
            : tap(function () { }) // no-op
        )
            .subscribe(function (modelChange) { return _this.publishOutputModelChange(modelChange); });
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.subscribeResizeObserver = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (CompatibilityHelper.isResizeObserverAvailable()) {
            this.resizeObserver = new ResizeObserver(function () { return _this.calculateViewDimensionsAndDetectChanges(); });
            this.resizeObserver.observe(this.elementRef.nativeElement);
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.unsubscribeResizeObserver = /**
     * @return {?}
     */
    function () {
        if (CompatibilityHelper.isResizeObserverAvailable() && this.resizeObserver !== null) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.unsubscribeOnMove = /**
     * @return {?}
     */
    function () {
        if (!ValueHelper.isNullOrUndefined(this.onMoveEventListener)) {
            this.eventListenerHelper.detachEventListener(this.onMoveEventListener);
            this.onMoveEventListener = null;
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.unsubscribeOnEnd = /**
     * @return {?}
     */
    function () {
        if (!ValueHelper.isNullOrUndefined(this.onEndEventListener)) {
            this.eventListenerHelper.detachEventListener(this.onEndEventListener);
            this.onEndEventListener = null;
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.unsubscribeInputModelChangeSubject = /**
     * @return {?}
     */
    function () {
        if (!ValueHelper.isNullOrUndefined(this.inputModelChangeSubscription)) {
            this.inputModelChangeSubscription.unsubscribe();
            this.inputModelChangeSubscription = null;
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.unsubscribeOutputModelChangeSubject = /**
     * @return {?}
     */
    function () {
        if (!ValueHelper.isNullOrUndefined(this.outputModelChangeSubscription)) {
            this.outputModelChangeSubscription.unsubscribe();
            this.outputModelChangeSubscription = null;
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.unsubscribeManualRefresh = /**
     * @return {?}
     */
    function () {
        if (!ValueHelper.isNullOrUndefined(this.manualRefreshSubscription)) {
            this.manualRefreshSubscription.unsubscribe();
            this.manualRefreshSubscription = null;
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.unsubscribeTriggerFocus = /**
     * @return {?}
     */
    function () {
        if (!ValueHelper.isNullOrUndefined(this.triggerFocusSubscription)) {
            this.triggerFocusSubscription.unsubscribe();
            this.triggerFocusSubscription = null;
        }
    };
    /**
     * @param {?} pointerType
     * @return {?}
     */
    SliderComponent.prototype.getPointerElement = /**
     * @param {?} pointerType
     * @return {?}
     */
    function (pointerType) {
        if (pointerType === PointerType.Min) {
            return this.minHandleElement;
        }
        else if (pointerType === PointerType.Max) {
            return this.maxHandleElement;
        }
        return null;
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.getCurrentTrackingValue = /**
     * @return {?}
     */
    function () {
        if (this.currentTrackingPointer === PointerType.Min) {
            return this.viewLowValue;
        }
        else if (this.currentTrackingPointer === PointerType.Max) {
            return this.viewHighValue;
        }
        return null;
    };
    /**
     * @param {?} modelValue
     * @return {?}
     */
    SliderComponent.prototype.modelValueToViewValue = /**
     * @param {?} modelValue
     * @return {?}
     */
    function (modelValue) {
        if (ValueHelper.isNullOrUndefined(modelValue)) {
            return NaN;
        }
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray) && !this.viewOptions.bindIndexForStepsArray) {
            return ValueHelper.findStepIndex(+modelValue, this.viewOptions.stepsArray);
        }
        return +modelValue;
    };
    /**
     * @param {?} viewValue
     * @return {?}
     */
    SliderComponent.prototype.viewValueToModelValue = /**
     * @param {?} viewValue
     * @return {?}
     */
    function (viewValue) {
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray) && !this.viewOptions.bindIndexForStepsArray) {
            return this.getStepValue(viewValue);
        }
        return viewValue;
    };
    /**
     * @param {?} sliderValue
     * @return {?}
     */
    SliderComponent.prototype.getStepValue = /**
     * @param {?} sliderValue
     * @return {?}
     */
    function (sliderValue) {
        /** @type {?} */
        var step = this.viewOptions.stepsArray[sliderValue];
        return (!ValueHelper.isNullOrUndefined(step)) ? step.value : NaN;
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.applyViewChange = /**
     * @return {?}
     */
    function () {
        this.value = this.viewValueToModelValue(this.viewLowValue);
        if (this.range) {
            this.highValue = this.viewValueToModelValue(this.viewHighValue);
        }
        this.outputModelChangeSubject.next({
            value: this.value,
            highValue: this.highValue,
            userEventInitiated: true,
            forceChange: false
        });
        // At this point all changes are applied and outputs are emitted, so we should be done.
        // However, input changes are communicated in different stream and we need to be ready to
        // act on the next input change even if it is exactly the same as last input change.
        // Therefore, we send a special event to reset the stream.
        this.inputModelChangeSubject.next({
            value: this.value,
            highValue: this.highValue,
            forceChange: false,
            internalChange: true
        });
    };
    /**
     * @param {?} modelChange
     * @return {?}
     */
    SliderComponent.prototype.applyInputModelChange = /**
     * @param {?} modelChange
     * @return {?}
     */
    function (modelChange) {
        /** @type {?} */
        var normalisedModelChange = this.normaliseModelValues(modelChange);
        /** @type {?} */
        var normalisationChange = !ModelValues.compare(modelChange, normalisedModelChange);
        if (normalisationChange) {
            this.value = normalisedModelChange.value;
            this.highValue = normalisedModelChange.highValue;
        }
        this.viewLowValue = this.modelValueToViewValue(normalisedModelChange.value);
        if (this.range) {
            this.viewHighValue = this.modelValueToViewValue(normalisedModelChange.highValue);
        }
        else {
            this.viewHighValue = null;
        }
        this.updateLowHandle(this.valueToPosition(this.viewLowValue));
        if (this.range) {
            this.updateHighHandle(this.valueToPosition(this.viewHighValue));
        }
        this.updateSelectionBar();
        this.updateTicksScale();
        this.updateAriaAttributes();
        if (this.range) {
            this.updateCombinedLabel();
        }
        // At the end, we need to communicate the model change to the outputs as well
        // Normalisation changes are also always forced out to ensure that subscribers always end up in correct state
        this.outputModelChangeSubject.next({
            value: normalisedModelChange.value,
            highValue: normalisedModelChange.highValue,
            forceChange: normalisationChange,
            userEventInitiated: false
        });
    };
    /**
     * @param {?} modelChange
     * @return {?}
     */
    SliderComponent.prototype.publishOutputModelChange = /**
     * @param {?} modelChange
     * @return {?}
     */
    function (modelChange) {
        var _this = this;
        /** @type {?} */
        var emitOutputs = function () {
            _this.valueChange.emit(modelChange.value);
            if (_this.range) {
                _this.highValueChange.emit(modelChange.highValue);
            }
            if (!ValueHelper.isNullOrUndefined(_this.onChangeCallback)) {
                if (_this.range) {
                    _this.onChangeCallback([modelChange.value, modelChange.highValue]);
                }
                else {
                    _this.onChangeCallback(modelChange.value);
                }
            }
            if (!ValueHelper.isNullOrUndefined(_this.onTouchedCallback)) {
                if (_this.range) {
                    _this.onTouchedCallback([modelChange.value, modelChange.highValue]);
                }
                else {
                    _this.onTouchedCallback(modelChange.value);
                }
            }
        };
        if (modelChange.userEventInitiated) {
            // If this change was initiated by a user event, we can emit outputs in the same tick
            emitOutputs();
            this.userChange.emit(this.getChangeContext());
        }
        else {
            // But, if the change was initated by something else like a change in input bindings,
            // we need to wait until next tick to emit the outputs to keep Angular change detection happy
            setTimeout(function () { emitOutputs(); });
        }
    };
    /**
     * @param {?} input
     * @return {?}
     */
    SliderComponent.prototype.normaliseModelValues = /**
     * @param {?} input
     * @return {?}
     */
    function (input) {
        /** @type {?} */
        var normalisedInput = new ModelValues();
        normalisedInput.value = input.value;
        normalisedInput.highValue = input.highValue;
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray)) {
            // When using steps array, only round to nearest step in the array
            // No other enforcement can be done, as the step array may be out of order, and that is perfectly fine
            if (this.viewOptions.enforceStepsArray) {
                /** @type {?} */
                var valueIndex = ValueHelper.findStepIndex(normalisedInput.value, this.viewOptions.stepsArray);
                normalisedInput.value = this.viewOptions.stepsArray[valueIndex].value;
                if (this.range) {
                    /** @type {?} */
                    var highValueIndex = ValueHelper.findStepIndex(normalisedInput.highValue, this.viewOptions.stepsArray);
                    normalisedInput.highValue = this.viewOptions.stepsArray[highValueIndex].value;
                }
            }
            return normalisedInput;
        }
        if (this.viewOptions.enforceStep) {
            normalisedInput.value = this.roundStep(normalisedInput.value);
            if (this.range) {
                normalisedInput.highValue = this.roundStep(normalisedInput.highValue);
            }
        }
        if (this.viewOptions.enforceRange) {
            normalisedInput.value = MathHelper.clampToRange(normalisedInput.value, this.viewOptions.floor, this.viewOptions.ceil);
            if (this.range) {
                normalisedInput.highValue = MathHelper.clampToRange(normalisedInput.highValue, this.viewOptions.floor, this.viewOptions.ceil);
            }
            // Make sure that range slider invariant (value <= highValue) is always satisfied
            if (this.range && input.value > input.highValue) {
                // We know that both values are now clamped correctly, they may just be in the wrong order
                // So the easy solution is to swap them... except swapping is sometimes disabled in options, so we make the two values the same
                if (this.viewOptions.noSwitching) {
                    normalisedInput.value = normalisedInput.highValue;
                }
                else {
                    /** @type {?} */
                    var tempValue = input.value;
                    normalisedInput.value = input.highValue;
                    normalisedInput.highValue = tempValue;
                }
            }
        }
        return normalisedInput;
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.renormaliseModelValues = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var previousModelValues = {
            value: this.value,
            highValue: this.highValue
        };
        /** @type {?} */
        var normalisedModelValues = this.normaliseModelValues(previousModelValues);
        if (!ModelValues.compare(normalisedModelValues, previousModelValues)) {
            this.value = normalisedModelValues.value;
            this.highValue = normalisedModelValues.highValue;
            this.outputModelChangeSubject.next({
                value: this.value,
                highValue: this.highValue,
                forceChange: true,
                userEventInitiated: false
            });
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.onChangeOptions = /**
     * @return {?}
     */
    function () {
        if (!this.initHasRun) {
            return;
        }
        /** @type {?} */
        var previousInputEventsInterval = this.viewOptions.inputEventsInterval;
        /** @type {?} */
        var previousOutputEventsInterval = this.viewOptions.outputEventsInterval;
        /** @type {?} */
        var previousOptionsInfluencingEventBindings = this.getOptionsInfluencingEventBindings(this.viewOptions);
        this.applyOptions();
        /** @type {?} */
        var newOptionsInfluencingEventBindings = this.getOptionsInfluencingEventBindings(this.viewOptions);
        /** @type {?} */
        var rebindEvents = !ValueHelper.areArraysEqual(previousOptionsInfluencingEventBindings, newOptionsInfluencingEventBindings);
        if (previousInputEventsInterval !== this.viewOptions.inputEventsInterval) {
            this.unsubscribeInputModelChangeSubject();
            this.subscribeInputModelChangeSubject(this.viewOptions.inputEventsInterval);
        }
        if (previousOutputEventsInterval !== this.viewOptions.outputEventsInterval) {
            this.unsubscribeInputModelChangeSubject();
            this.subscribeInputModelChangeSubject(this.viewOptions.outputEventsInterval);
        }
        // With new options, we need to re-normalise model values if necessary
        this.renormaliseModelValues();
        this.viewLowValue = this.modelValueToViewValue(this.value);
        if (this.range) {
            this.viewHighValue = this.modelValueToViewValue(this.highValue);
        }
        else {
            this.viewHighValue = null;
        }
        this.resetSlider(rebindEvents);
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.applyOptions = /**
     * @return {?}
     */
    function () {
        this.viewOptions = new Options();
        Object.assign(this.viewOptions, this.options);
        this.viewOptions.draggableRange = this.range && this.viewOptions.draggableRange;
        this.viewOptions.draggableRangeOnly = this.range && this.viewOptions.draggableRangeOnly;
        if (this.viewOptions.draggableRangeOnly) {
            this.viewOptions.draggableRange = true;
        }
        this.viewOptions.showTicks = this.viewOptions.showTicks ||
            this.viewOptions.showTicksValues ||
            !ValueHelper.isNullOrUndefined(this.viewOptions.ticksArray);
        if (this.viewOptions.showTicks &&
            (!ValueHelper.isNullOrUndefined(this.viewOptions.tickStep) || !ValueHelper.isNullOrUndefined(this.viewOptions.ticksArray))) {
            this.intermediateTicks = true;
        }
        this.viewOptions.showSelectionBar = this.viewOptions.showSelectionBar ||
            this.viewOptions.showSelectionBarEnd ||
            !ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue);
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray)) {
            this.applyStepsArrayOptions();
        }
        else {
            this.applyFloorCeilOptions();
        }
        if (ValueHelper.isNullOrUndefined(this.viewOptions.combineLabels)) {
            this.viewOptions.combineLabels = function (minValue, maxValue) {
                return minValue + ' - ' + maxValue;
            };
        }
        if (this.viewOptions.logScale && this.viewOptions.floor === 0) {
            throw Error('Can\'t use floor=0 with logarithmic scale');
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.applyStepsArrayOptions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.viewOptions.floor = 0;
        this.viewOptions.ceil = this.viewOptions.stepsArray.length - 1;
        this.viewOptions.step = 1;
        if (ValueHelper.isNullOrUndefined(this.viewOptions.translate)) {
            this.viewOptions.translate = function (modelValue) {
                if (_this.viewOptions.bindIndexForStepsArray) {
                    return String(_this.getStepValue(modelValue));
                }
                return String(modelValue);
            };
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.applyFloorCeilOptions = /**
     * @return {?}
     */
    function () {
        if (ValueHelper.isNullOrUndefined(this.viewOptions.step)) {
            this.viewOptions.step = 1;
        }
        else {
            this.viewOptions.step = +this.viewOptions.step;
            if (this.viewOptions.step <= 0) {
                this.viewOptions.step = 1;
            }
        }
        if (ValueHelper.isNullOrUndefined(this.viewOptions.ceil) ||
            ValueHelper.isNullOrUndefined(this.viewOptions.floor)) {
            throw Error('floor and ceil options must be supplied');
        }
        this.viewOptions.ceil = +this.viewOptions.ceil;
        this.viewOptions.floor = +this.viewOptions.floor;
        if (ValueHelper.isNullOrUndefined(this.viewOptions.translate)) {
            this.viewOptions.translate = function (value) { return String(value); };
        }
    };
    /**
     * @param {?=} rebindEvents
     * @return {?}
     */
    SliderComponent.prototype.resetSlider = /**
     * @param {?=} rebindEvents
     * @return {?}
     */
    function (rebindEvents) {
        if (rebindEvents === void 0) { rebindEvents = true; }
        this.manageElementsStyle();
        this.addAccessibility();
        this.updateCeilLabel();
        this.updateFloorLabel();
        if (rebindEvents) {
            this.unbindEvents();
            this.manageEventsBindings();
        }
        this.updateDisabledState();
        this.calculateViewDimensions();
        this.refocusPointerIfNeeded();
    };
    /**
     * @param {?} pointerType
     * @return {?}
     */
    SliderComponent.prototype.focusPointer = /**
     * @param {?} pointerType
     * @return {?}
     */
    function (pointerType) {
        // If not supplied, use min pointer as default
        if (pointerType !== PointerType.Min && pointerType !== PointerType.Max) {
            pointerType = PointerType.Min;
        }
        if (pointerType === PointerType.Min) {
            this.minHandleElement.focus();
        }
        else if (this.range && pointerType === PointerType.Max) {
            this.maxHandleElement.focus();
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.refocusPointerIfNeeded = /**
     * @return {?}
     */
    function () {
        if (!ValueHelper.isNullOrUndefined(this.currentFocusPointer)) {
            this.onPointerFocus(this.currentFocusPointer);
            /** @type {?} */
            var element = this.getPointerElement(this.currentFocusPointer);
            element.focus();
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.manageElementsStyle = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.updateScale();
        this.floorLabelElement.setAlwaysHide(this.viewOptions.showTicksValues || this.viewOptions.hideLimitLabels);
        this.ceilLabelElement.setAlwaysHide(this.viewOptions.showTicksValues || this.viewOptions.hideLimitLabels);
        /** @type {?} */
        var hideLabelsForTicks = this.viewOptions.showTicksValues && !this.intermediateTicks;
        this.minHandleLabelElement.setAlwaysHide(hideLabelsForTicks || this.viewOptions.hidePointerLabels);
        this.maxHandleLabelElement.setAlwaysHide(hideLabelsForTicks || !this.range || this.viewOptions.hidePointerLabels);
        this.combinedLabelElement.setAlwaysHide(hideLabelsForTicks || !this.range || this.viewOptions.hidePointerLabels);
        this.selectionBarElement.setAlwaysHide(!this.range && !this.viewOptions.showSelectionBar);
        this.leftOuterSelectionBarElement.setAlwaysHide(!this.range || !this.viewOptions.showOuterSelectionBars);
        this.rightOuterSelectionBarElement.setAlwaysHide(!this.range || !this.viewOptions.showOuterSelectionBars);
        this.fullBarTransparentClass = this.range && this.viewOptions.showOuterSelectionBars;
        this.selectionBarDraggableClass = this.viewOptions.draggableRange && !this.viewOptions.onlyBindHandles;
        this.ticksUnderValuesClass = this.intermediateTicks && this.options.showTicksValues;
        if (this.sliderElementVerticalClass !== this.viewOptions.vertical) {
            this.updateVerticalState();
            // The above change in host component class will not be applied until the end of this cycle
            // However, functions calculating the slider position expect the slider to be already styled as vertical
            // So as a workaround, we need to reset the slider once again to compute the correct values
            setTimeout(function () { _this.resetSlider(); });
        }
        // Changing animate class may interfere with slider reset/initialisation, so we should set it separately,
        // after all is properly set up
        if (this.sliderElementAnimateClass !== this.viewOptions.animate) {
            setTimeout(function () { _this.sliderElementAnimateClass = _this.viewOptions.animate; });
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.manageEventsBindings = /**
     * @return {?}
     */
    function () {
        if (this.viewOptions.disabled || this.viewOptions.readOnly) {
            this.unbindEvents();
        }
        else {
            this.bindEvents();
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateDisabledState = /**
     * @return {?}
     */
    function () {
        this.sliderElementDisabledAttr = this.viewOptions.disabled ? 'disabled' : null;
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateVerticalState = /**
     * @return {?}
     */
    function () {
        this.sliderElementVerticalClass = this.viewOptions.vertical;
        try {
            for (var _a = tslib_1.__values(this.getAllSliderElements()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var element = _b.value;
                // This is also called before ngAfterInit, so need to check that view child bindings work
                if (!ValueHelper.isNullOrUndefined(element)) {
                    element.setVertical(this.viewOptions.vertical);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateScale = /**
     * @return {?}
     */
    function () {
        try {
            for (var _a = tslib_1.__values(this.getAllSliderElements()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var element = _b.value;
                element.setScale(this.viewOptions.scale);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var e_2, _c;
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.getAllSliderElements = /**
     * @return {?}
     */
    function () {
        return [this.leftOuterSelectionBarElement,
            this.rightOuterSelectionBarElement,
            this.fullBarElement,
            this.selectionBarElement,
            this.minHandleElement,
            this.maxHandleElement,
            this.floorLabelElement,
            this.ceilLabelElement,
            this.minHandleLabelElement,
            this.maxHandleLabelElement,
            this.combinedLabelElement,
            this.ticksElement
        ];
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.initHandles = /**
     * @return {?}
     */
    function () {
        this.updateLowHandle(this.valueToPosition(this.viewLowValue));
        /*
           the order here is important since the selection bar should be
           updated after the high handle but before the combined label
           */
        if (this.range) {
            this.updateHighHandle(this.valueToPosition(this.viewHighValue));
        }
        this.updateSelectionBar();
        if (this.range) {
            this.updateCombinedLabel();
        }
        this.updateTicksScale();
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.addAccessibility = /**
     * @return {?}
     */
    function () {
        this.updateAriaAttributes();
        this.minHandleElement.role = 'slider';
        if (this.viewOptions.keyboardSupport &&
            !(this.viewOptions.readOnly || this.viewOptions.disabled)) {
            this.minHandleElement.tabindex = '0';
        }
        else {
            this.minHandleElement.tabindex = '';
        }
        this.minHandleElement.ariaOrientation = this.viewOptions.vertical ? 'vertical' : 'horizontal';
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.ariaLabel)) {
            this.minHandleElement.ariaLabel = this.viewOptions.ariaLabel;
        }
        else if (!ValueHelper.isNullOrUndefined(this.viewOptions.ariaLabelledBy)) {
            this.minHandleElement.ariaLabelledBy = this.viewOptions.ariaLabelledBy;
        }
        if (this.range) {
            this.maxHandleElement.role = 'slider';
            if (this.viewOptions.keyboardSupport &&
                !(this.viewOptions.readOnly || this.viewOptions.disabled)) {
                this.maxHandleElement.tabindex = '0';
            }
            else {
                this.maxHandleElement.tabindex = '';
            }
            this.maxHandleElement.ariaOrientation = this.viewOptions.vertical ? 'vertical' : 'horizontal';
            if (!ValueHelper.isNullOrUndefined(this.viewOptions.ariaLabelHigh)) {
                this.maxHandleElement.ariaLabel = this.viewOptions.ariaLabelHigh;
            }
            else if (!ValueHelper.isNullOrUndefined(this.viewOptions.ariaLabelledByHigh)) {
                this.maxHandleElement.ariaLabelledBy = this.viewOptions.ariaLabelledByHigh;
            }
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateAriaAttributes = /**
     * @return {?}
     */
    function () {
        this.minHandleElement.ariaValueNow = (+this.value).toString();
        this.minHandleElement.ariaValueText = this.viewOptions.translate(+this.value, LabelType.Low);
        this.minHandleElement.ariaValueMin = this.viewOptions.floor.toString();
        this.minHandleElement.ariaValueMax = this.viewOptions.ceil.toString();
        if (this.range) {
            this.maxHandleElement.ariaValueNow = (+this.highValue).toString();
            this.maxHandleElement.ariaValueText = this.viewOptions.translate(+this.highValue, LabelType.High);
            this.maxHandleElement.ariaValueMin = this.viewOptions.floor.toString();
            this.maxHandleElement.ariaValueMax = this.viewOptions.ceil.toString();
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.calculateViewDimensions = /**
     * @return {?}
     */
    function () {
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.handleDimension)) {
            this.minHandleElement.setDimension(this.viewOptions.handleDimension);
        }
        else {
            this.minHandleElement.calculateDimension();
        }
        /** @type {?} */
        var handleWidth = this.minHandleElement.dimension;
        this.handleHalfDimension = handleWidth / 2;
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.barDimension)) {
            this.fullBarElement.setDimension(this.viewOptions.barDimension);
        }
        else {
            this.fullBarElement.calculateDimension();
        }
        this.maxHandlePosition = this.fullBarElement.dimension - handleWidth;
        if (this.initHasRun) {
            this.updateFloorLabel();
            this.updateCeilLabel();
            this.initHandles();
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.calculateViewDimensionsAndDetectChanges = /**
     * @return {?}
     */
    function () {
        this.calculateViewDimensions();
        if (!this.isRefDestroyed()) {
            this.changeDetectionRef.detectChanges();
        }
    };
    /**
     * If the slider reference is already destroyed
     * @return {?} boolean - true if ref is destroyed
     */
    SliderComponent.prototype.isRefDestroyed = /**
     * If the slider reference is already destroyed
     * @return {?} boolean - true if ref is destroyed
     */
    function () {
        return this.changeDetectionRef['destroyed'];
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateTicksScale = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.viewOptions.showTicks) {
            setTimeout(function () { _this.sliderElementWithLegendClass = false; });
            return;
        }
        /** @type {?} */
        var ticksArray = !ValueHelper.isNullOrUndefined(this.viewOptions.ticksArray)
            ? this.viewOptions.ticksArray
            : this.getTicksArray();
        /** @type {?} */
        var translate = this.viewOptions.vertical ? 'translateY' : 'translateX';
        if (this.viewOptions.rightToLeft) {
            ticksArray.reverse();
        }
        /** @type {?} */
        var tickValueStep = !ValueHelper.isNullOrUndefined(this.viewOptions.tickValueStep) ? this.viewOptions.tickValueStep :
            (!ValueHelper.isNullOrUndefined(this.viewOptions.tickStep) ? this.viewOptions.tickStep : this.viewOptions.step);
        /** @type {?} */
        var hasAtLeastOneLegend = false;
        /** @type {?} */
        var newTicks = ticksArray.map(function (value) {
            /** @type {?} */
            var position = _this.valueToPosition(value);
            if (_this.viewOptions.vertical) {
                position = _this.maxHandlePosition - position;
            }
            /** @type {?} */
            var translation = translate + '(' + Math.round(position) + 'px)';
            /** @type {?} */
            var tick = new Tick();
            tick.selected = _this.isTickSelected(value);
            tick.style = {
                '-webkit-transform': translation,
                '-moz-transform': translation,
                '-o-transform': translation,
                '-ms-transform': translation,
                transform: translation,
            };
            if (tick.selected && !ValueHelper.isNullOrUndefined(_this.viewOptions.getSelectionBarColor)) {
                tick.style['background-color'] = _this.getSelectionBarColor();
            }
            if (!tick.selected && !ValueHelper.isNullOrUndefined(_this.viewOptions.getTickColor)) {
                tick.style['background-color'] = _this.getTickColor(value);
            }
            if (!ValueHelper.isNullOrUndefined(_this.viewOptions.ticksTooltip)) {
                tick.tooltip = _this.viewOptions.ticksTooltip(value);
                tick.tooltipPlacement = _this.viewOptions.vertical ? 'right' : 'top';
            }
            if (_this.viewOptions.showTicksValues && !ValueHelper.isNullOrUndefined(tickValueStep) &&
                MathHelper.isModuloWithinPrecisionLimit(value, tickValueStep, _this.viewOptions.precisionLimit)) {
                tick.value = _this.getDisplayValue(value, LabelType.TickValue);
                if (!ValueHelper.isNullOrUndefined(_this.viewOptions.ticksValuesTooltip)) {
                    tick.valueTooltip = _this.viewOptions.ticksValuesTooltip(value);
                    tick.valueTooltipPlacement = _this.viewOptions.vertical
                        ? 'right'
                        : 'top';
                }
            }
            /** @type {?} */
            var legend = null;
            if (!ValueHelper.isNullOrUndefined(_this.viewOptions.stepsArray)) {
                /** @type {?} */
                var step = _this.viewOptions.stepsArray[value];
                if (!ValueHelper.isNullOrUndefined(_this.viewOptions.getStepLegend)) {
                    legend = _this.viewOptions.getStepLegend(step);
                }
                else if (!ValueHelper.isNullOrUndefined(step)) {
                    legend = step.legend;
                }
            }
            else if (!ValueHelper.isNullOrUndefined(_this.viewOptions.getLegend)) {
                legend = _this.viewOptions.getLegend(value);
            }
            if (!ValueHelper.isNullOrUndefined(legend)) {
                tick.legend = legend;
                hasAtLeastOneLegend = true;
            }
            return tick;
        });
        setTimeout(function () { _this.sliderElementWithLegendClass = hasAtLeastOneLegend; });
        // We should avoid re-creating the ticks array if possible
        // This both improves performance and makes CSS animations work correctly
        if (!ValueHelper.isNullOrUndefined(this.ticks) && this.ticks.length === newTicks.length) {
            for (var i = 0; i < newTicks.length; ++i) {
                Object.assign(this.ticks[i], newTicks[i]);
            }
        }
        else {
            this.ticks = newTicks;
        }
        if (!this.isRefDestroyed()) {
            this.changeDetectionRef.detectChanges();
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.getTicksArray = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var step = (!ValueHelper.isNullOrUndefined(this.viewOptions.tickStep)) ? this.viewOptions.tickStep : this.viewOptions.step;
        /** @type {?} */
        var ticksArray = [];
        /** @type {?} */
        var numberOfValues = 1 + Math.floor(MathHelper.roundToPrecisionLimit(Math.abs(this.viewOptions.ceil - this.viewOptions.floor) / step, this.viewOptions.precisionLimit));
        for (var index = 0; index < numberOfValues; ++index) {
            ticksArray.push(MathHelper.roundToPrecisionLimit(this.viewOptions.floor + step * index, this.viewOptions.precisionLimit));
        }
        return ticksArray;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SliderComponent.prototype.isTickSelected = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.range) {
            if (!ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue)) {
                /** @type {?} */
                var center = this.viewOptions.showSelectionBarFromValue;
                if (this.viewLowValue > center &&
                    value >= center &&
                    value <= this.viewLowValue) {
                    return true;
                }
                else if (this.viewLowValue < center &&
                    value <= center &&
                    value >= this.viewLowValue) {
                    return true;
                }
            }
            else if (this.viewOptions.showSelectionBarEnd) {
                if (value >= this.viewLowValue) {
                    return true;
                }
            }
            else if (this.viewOptions.showSelectionBar && value <= this.viewLowValue) {
                return true;
            }
        }
        if (this.range && value >= this.viewLowValue && value <= this.viewHighValue) {
            return true;
        }
        return false;
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateFloorLabel = /**
     * @return {?}
     */
    function () {
        if (!this.floorLabelElement.alwaysHide) {
            this.floorLabelElement.setValue(this.getDisplayValue(this.viewOptions.floor, LabelType.Floor));
            this.floorLabelElement.calculateDimension();
            /** @type {?} */
            var position = this.viewOptions.rightToLeft
                ? this.fullBarElement.dimension - this.floorLabelElement.dimension
                : 0;
            this.floorLabelElement.setPosition(position);
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateCeilLabel = /**
     * @return {?}
     */
    function () {
        if (!this.ceilLabelElement.alwaysHide) {
            this.ceilLabelElement.setValue(this.getDisplayValue(this.viewOptions.ceil, LabelType.Ceil));
            this.ceilLabelElement.calculateDimension();
            /** @type {?} */
            var position = this.viewOptions.rightToLeft
                ? 0
                : this.fullBarElement.dimension - this.ceilLabelElement.dimension;
            this.ceilLabelElement.setPosition(position);
        }
    };
    /**
     * @param {?} which
     * @param {?} newPos
     * @return {?}
     */
    SliderComponent.prototype.updateHandles = /**
     * @param {?} which
     * @param {?} newPos
     * @return {?}
     */
    function (which, newPos) {
        if (which === PointerType.Min) {
            this.updateLowHandle(newPos);
        }
        else if (which === PointerType.Max) {
            this.updateHighHandle(newPos);
        }
        this.updateSelectionBar();
        this.updateTicksScale();
        if (this.range) {
            this.updateCombinedLabel();
        }
    };
    /**
     * @param {?} labelType
     * @param {?} newPos
     * @return {?}
     */
    SliderComponent.prototype.getHandleLabelPos = /**
     * @param {?} labelType
     * @param {?} newPos
     * @return {?}
     */
    function (labelType, newPos) {
        /** @type {?} */
        var labelDimension = (labelType === PointerType.Min)
            ? this.minHandleLabelElement.dimension
            : this.maxHandleLabelElement.dimension;
        /** @type {?} */
        var nearHandlePos = newPos - labelDimension / 2 + this.handleHalfDimension;
        /** @type {?} */
        var endOfBarPos = this.fullBarElement.dimension - labelDimension;
        if (!this.viewOptions.boundPointerLabels) {
            return nearHandlePos;
        }
        if ((this.viewOptions.rightToLeft && labelType === PointerType.Min) ||
            (!this.viewOptions.rightToLeft && labelType === PointerType.Max)) {
            return Math.min(nearHandlePos, endOfBarPos);
        }
        else {
            return Math.min(Math.max(nearHandlePos, 0), endOfBarPos);
        }
    };
    /**
     * @param {?} newPos
     * @return {?}
     */
    SliderComponent.prototype.updateLowHandle = /**
     * @param {?} newPos
     * @return {?}
     */
    function (newPos) {
        this.minHandleElement.setPosition(newPos);
        this.minHandleLabelElement.setValue(this.getDisplayValue(this.viewLowValue, LabelType.Low));
        this.minHandleLabelElement.setPosition(this.getHandleLabelPos(PointerType.Min, newPos));
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.getPointerColor)) {
            this.minPointerStyle = {
                backgroundColor: this.getPointerColor(PointerType.Min),
            };
        }
        if (this.viewOptions.autoHideLimitLabels) {
            this.updateFloorAndCeilLabelsVisibility();
        }
    };
    /**
     * @param {?} newPos
     * @return {?}
     */
    SliderComponent.prototype.updateHighHandle = /**
     * @param {?} newPos
     * @return {?}
     */
    function (newPos) {
        this.maxHandleElement.setPosition(newPos);
        this.maxHandleLabelElement.setValue(this.getDisplayValue(this.viewHighValue, LabelType.High));
        this.maxHandleLabelElement.setPosition(this.getHandleLabelPos(PointerType.Max, newPos));
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.getPointerColor)) {
            this.maxPointerStyle = {
                backgroundColor: this.getPointerColor(PointerType.Max),
            };
        }
        if (this.viewOptions.autoHideLimitLabels) {
            this.updateFloorAndCeilLabelsVisibility();
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateFloorAndCeilLabelsVisibility = /**
     * @return {?}
     */
    function () {
        // Show based only on hideLimitLabels if pointer labels are hidden
        if (this.viewOptions.hidePointerLabels) {
            return;
        }
        /** @type {?} */
        var floorLabelHidden = false;
        /** @type {?} */
        var ceilLabelHidden = false;
        /** @type {?} */
        var isMinLabelAtFloor = this.isLabelBelowFloorLabel(this.minHandleLabelElement);
        /** @type {?} */
        var isMinLabelAtCeil = this.isLabelAboveCeilLabel(this.minHandleLabelElement);
        /** @type {?} */
        var isMaxLabelAtCeil = this.isLabelAboveCeilLabel(this.maxHandleLabelElement);
        /** @type {?} */
        var isCombinedLabelAtFloor = this.isLabelBelowFloorLabel(this.combinedLabelElement);
        /** @type {?} */
        var isCombinedLabelAtCeil = this.isLabelAboveCeilLabel(this.combinedLabelElement);
        if (isMinLabelAtFloor) {
            floorLabelHidden = true;
            this.floorLabelElement.hide();
        }
        else {
            floorLabelHidden = false;
            this.floorLabelElement.show();
        }
        if (isMinLabelAtCeil) {
            ceilLabelHidden = true;
            this.ceilLabelElement.hide();
        }
        else {
            ceilLabelHidden = false;
            this.ceilLabelElement.show();
        }
        if (this.range) {
            /** @type {?} */
            var hideCeil = this.combinedLabelElement.isVisible() ? isCombinedLabelAtCeil : isMaxLabelAtCeil;
            /** @type {?} */
            var hideFloor = this.combinedLabelElement.isVisible() ? isCombinedLabelAtFloor : isMinLabelAtFloor;
            if (hideCeil) {
                this.ceilLabelElement.hide();
            }
            else if (!ceilLabelHidden) {
                this.ceilLabelElement.show();
            }
            // Hide or show floor label
            if (hideFloor) {
                this.floorLabelElement.hide();
            }
            else if (!floorLabelHidden) {
                this.floorLabelElement.show();
            }
        }
    };
    /**
     * @param {?} label
     * @return {?}
     */
    SliderComponent.prototype.isLabelBelowFloorLabel = /**
     * @param {?} label
     * @return {?}
     */
    function (label) {
        /** @type {?} */
        var pos = label.position;
        /** @type {?} */
        var dim = label.dimension;
        /** @type {?} */
        var floorPos = this.floorLabelElement.position;
        /** @type {?} */
        var floorDim = this.floorLabelElement.dimension;
        return this.viewOptions.rightToLeft
            ? pos + dim >= floorPos - 2
            : pos <= floorPos + floorDim + 2;
    };
    /**
     * @param {?} label
     * @return {?}
     */
    SliderComponent.prototype.isLabelAboveCeilLabel = /**
     * @param {?} label
     * @return {?}
     */
    function (label) {
        /** @type {?} */
        var pos = label.position;
        /** @type {?} */
        var dim = label.dimension;
        /** @type {?} */
        var ceilPos = this.ceilLabelElement.position;
        /** @type {?} */
        var ceilDim = this.ceilLabelElement.dimension;
        return this.viewOptions.rightToLeft
            ? pos <= ceilPos + ceilDim + 2
            : pos + dim >= ceilPos - 2;
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateSelectionBar = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var position = 0;
        /** @type {?} */
        var dimension = 0;
        /** @type {?} */
        var isSelectionBarFromRight = this.viewOptions.rightToLeft
            ? !this.viewOptions.showSelectionBarEnd
            : this.viewOptions.showSelectionBarEnd;
        /** @type {?} */
        var positionForRange = this.viewOptions.rightToLeft
            ? this.maxHandleElement.position + this.handleHalfDimension
            : this.minHandleElement.position + this.handleHalfDimension;
        if (this.range) {
            dimension = Math.abs(this.maxHandleElement.position - this.minHandleElement.position);
            position = positionForRange;
        }
        else {
            if (!ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue)) {
                /** @type {?} */
                var center = this.viewOptions.showSelectionBarFromValue;
                /** @type {?} */
                var centerPosition = this.valueToPosition(center);
                /** @type {?} */
                var isModelGreaterThanCenter = this.viewOptions.rightToLeft
                    ? this.viewLowValue <= center
                    : this.viewLowValue > center;
                if (isModelGreaterThanCenter) {
                    dimension = this.minHandleElement.position - centerPosition;
                    position = centerPosition + this.handleHalfDimension;
                }
                else {
                    dimension = centerPosition - this.minHandleElement.position;
                    position = this.minHandleElement.position + this.handleHalfDimension;
                }
            }
            else if (isSelectionBarFromRight) {
                dimension = Math.ceil(Math.abs(this.maxHandlePosition - this.minHandleElement.position) + this.handleHalfDimension);
                position = Math.floor(this.minHandleElement.position + this.handleHalfDimension);
            }
            else {
                dimension = this.minHandleElement.position + this.handleHalfDimension;
                position = 0;
            }
        }
        this.selectionBarElement.setDimension(dimension);
        this.selectionBarElement.setPosition(position);
        if (this.range && this.viewOptions.showOuterSelectionBars) {
            if (this.viewOptions.rightToLeft) {
                this.rightOuterSelectionBarElement.setDimension(position);
                this.rightOuterSelectionBarElement.setPosition(0);
                this.fullBarElement.calculateDimension();
                this.leftOuterSelectionBarElement.setDimension(this.fullBarElement.dimension - (position + dimension));
                this.leftOuterSelectionBarElement.setPosition(position + dimension);
            }
            else {
                this.leftOuterSelectionBarElement.setDimension(position);
                this.leftOuterSelectionBarElement.setPosition(0);
                this.fullBarElement.calculateDimension();
                this.rightOuterSelectionBarElement.setDimension(this.fullBarElement.dimension - (position + dimension));
                this.rightOuterSelectionBarElement.setPosition(position + dimension);
            }
        }
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.getSelectionBarColor)) {
            /** @type {?} */
            var color = this.getSelectionBarColor();
            this.barStyle = {
                backgroundColor: color,
            };
        }
        else if (!ValueHelper.isNullOrUndefined(this.viewOptions.selectionBarGradient)) {
            /** @type {?} */
            var offset = (!ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue))
                ? this.valueToPosition(this.viewOptions.showSelectionBarFromValue)
                : 0;
            /** @type {?} */
            var reversed = (offset - position > 0 && !isSelectionBarFromRight) || (offset - position <= 0 && isSelectionBarFromRight);
            /** @type {?} */
            var direction = this.viewOptions.vertical
                ? reversed ? 'bottom' : 'top'
                : reversed ? 'left' : 'right';
            this.barStyle = {
                backgroundImage: 'linear-gradient(to ' +
                    direction +
                    ', ' +
                    this.viewOptions.selectionBarGradient.from +
                    ' 0%,' +
                    this.viewOptions.selectionBarGradient.to +
                    ' 100%)',
            };
            if (this.viewOptions.vertical) {
                this.barStyle.backgroundPosition =
                    'center ' +
                        (offset +
                            dimension +
                            position +
                            (reversed ? -this.handleHalfDimension : 0)) +
                        'px';
                this.barStyle.backgroundSize =
                    '100% ' + (this.fullBarElement.dimension - this.handleHalfDimension) + 'px';
            }
            else {
                this.barStyle.backgroundPosition =
                    offset -
                        position +
                        (reversed ? this.handleHalfDimension : 0) +
                        'px center';
                this.barStyle.backgroundSize =
                    this.fullBarElement.dimension - this.handleHalfDimension + 'px 100%';
            }
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.getSelectionBarColor = /**
     * @return {?}
     */
    function () {
        if (this.range) {
            return this.viewOptions.getSelectionBarColor(this.value, this.highValue);
        }
        return this.viewOptions.getSelectionBarColor(this.value);
    };
    /**
     * @param {?} pointerType
     * @return {?}
     */
    SliderComponent.prototype.getPointerColor = /**
     * @param {?} pointerType
     * @return {?}
     */
    function (pointerType) {
        if (pointerType === PointerType.Max) {
            return this.viewOptions.getPointerColor(this.highValue, pointerType);
        }
        return this.viewOptions.getPointerColor(this.value, pointerType);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SliderComponent.prototype.getTickColor = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.viewOptions.getTickColor(value);
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateCombinedLabel = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var isLabelOverlap = null;
        if (this.viewOptions.rightToLeft) {
            isLabelOverlap =
                this.minHandleLabelElement.position - this.minHandleLabelElement.dimension - 10 <= this.maxHandleLabelElement.position;
        }
        else {
            isLabelOverlap =
                this.minHandleLabelElement.position + this.minHandleLabelElement.dimension + 10 >= this.maxHandleLabelElement.position;
        }
        if (isLabelOverlap) {
            /** @type {?} */
            var lowDisplayValue = this.getDisplayValue(this.viewLowValue, LabelType.Low);
            /** @type {?} */
            var highDisplayValue = this.getDisplayValue(this.viewHighValue, LabelType.High);
            /** @type {?} */
            var combinedLabelValue = this.viewOptions.rightToLeft
                ? this.viewOptions.combineLabels(highDisplayValue, lowDisplayValue)
                : this.viewOptions.combineLabels(lowDisplayValue, highDisplayValue);
            this.combinedLabelElement.setValue(combinedLabelValue);
            /** @type {?} */
            var pos = this.viewOptions.boundPointerLabels
                ? Math.min(Math.max(this.selectionBarElement.position +
                    this.selectionBarElement.dimension / 2 -
                    this.combinedLabelElement.dimension / 2, 0), this.fullBarElement.dimension - this.combinedLabelElement.dimension)
                : this.selectionBarElement.position + this.selectionBarElement.dimension / 2 - this.combinedLabelElement.dimension / 2;
            this.combinedLabelElement.setPosition(pos);
            this.minHandleLabelElement.hide();
            this.maxHandleLabelElement.hide();
            this.combinedLabelElement.show();
        }
        else {
            this.updateHighHandle(this.valueToPosition(this.viewHighValue));
            this.updateLowHandle(this.valueToPosition(this.viewLowValue));
            this.maxHandleLabelElement.show();
            this.minHandleLabelElement.show();
            this.combinedLabelElement.hide();
        }
        if (this.viewOptions.autoHideLimitLabels) {
            this.updateFloorAndCeilLabelsVisibility();
        }
    };
    /**
     * @param {?} value
     * @param {?} which
     * @return {?}
     */
    SliderComponent.prototype.getDisplayValue = /**
     * @param {?} value
     * @param {?} which
     * @return {?}
     */
    function (value, which) {
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray) && !this.viewOptions.bindIndexForStepsArray) {
            value = this.getStepValue(value);
        }
        return this.viewOptions.translate(value, which);
    };
    /**
     * @param {?} value
     * @param {?=} customStep
     * @return {?}
     */
    SliderComponent.prototype.roundStep = /**
     * @param {?} value
     * @param {?=} customStep
     * @return {?}
     */
    function (value, customStep) {
        /** @type {?} */
        var step = !ValueHelper.isNullOrUndefined(customStep) ? customStep : this.viewOptions.step;
        /** @type {?} */
        var steppedDifference = MathHelper.roundToPrecisionLimit((value - this.viewOptions.floor) / step, this.viewOptions.precisionLimit);
        steppedDifference = Math.round(steppedDifference) * step;
        return MathHelper.roundToPrecisionLimit(this.viewOptions.floor + steppedDifference, this.viewOptions.precisionLimit);
    };
    /**
     * @param {?} val
     * @return {?}
     */
    SliderComponent.prototype.valueToPosition = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        /** @type {?} */
        var fn = ValueHelper.linearValueToPosition;
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.customValueToPosition)) {
            fn = this.viewOptions.customValueToPosition;
        }
        else if (this.viewOptions.logScale) {
            fn = ValueHelper.logValueToPosition;
        }
        val = MathHelper.clampToRange(val, this.viewOptions.floor, this.viewOptions.ceil);
        /** @type {?} */
        var percent = fn(val, this.viewOptions.floor, this.viewOptions.ceil);
        if (ValueHelper.isNullOrUndefined(percent)) {
            percent = 0;
        }
        if (this.viewOptions.rightToLeft) {
            percent = 1 - percent;
        }
        return percent * this.maxHandlePosition;
    };
    /**
     * @param {?} position
     * @return {?}
     */
    SliderComponent.prototype.positionToValue = /**
     * @param {?} position
     * @return {?}
     */
    function (position) {
        /** @type {?} */
        var percent = position / this.maxHandlePosition;
        if (this.viewOptions.rightToLeft) {
            percent = 1 - percent;
        }
        /** @type {?} */
        var fn = ValueHelper.linearPositionToValue;
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.customPositionToValue)) {
            fn = this.viewOptions.customPositionToValue;
        }
        else if (this.viewOptions.logScale) {
            fn = ValueHelper.logPositionToValue;
        }
        /** @type {?} */
        var value = fn(percent, this.viewOptions.floor, this.viewOptions.ceil);
        return !ValueHelper.isNullOrUndefined(value) ? value : 0;
    };
    /**
     * @param {?} event
     * @param {?=} targetTouchId
     * @return {?}
     */
    SliderComponent.prototype.getEventXY = /**
     * @param {?} event
     * @param {?=} targetTouchId
     * @return {?}
     */
    function (event, targetTouchId) {
        if (event instanceof MouseEvent) {
            return this.viewOptions.vertical ? event.clientY : event.clientX;
        }
        /** @type {?} */
        var touchIndex = 0;
        /** @type {?} */
        var touches = event.touches;
        if (!ValueHelper.isNullOrUndefined(targetTouchId)) {
            for (var i = 0; i < touches.length; i++) {
                if (touches[i].identifier === targetTouchId) {
                    touchIndex = i;
                    break;
                }
            }
        }
        // Return the target touch or if the target touch was not found in the event
        // returns the coordinates of the first touch
        return this.viewOptions.vertical ? touches[touchIndex].clientY : touches[touchIndex].clientX;
    };
    /**
     * @param {?} event
     * @param {?=} targetTouchId
     * @return {?}
     */
    SliderComponent.prototype.getEventPosition = /**
     * @param {?} event
     * @param {?=} targetTouchId
     * @return {?}
     */
    function (event, targetTouchId) {
        /** @type {?} */
        var sliderElementBoundingRect = this.elementRef.nativeElement.getBoundingClientRect();
        /** @type {?} */
        var sliderPos = this.viewOptions.vertical ?
            sliderElementBoundingRect.bottom : sliderElementBoundingRect.left;
        /** @type {?} */
        var eventPos = 0;
        if (this.viewOptions.vertical) {
            eventPos = -this.getEventXY(event, targetTouchId) + sliderPos;
        }
        else {
            eventPos = this.getEventXY(event, targetTouchId) - sliderPos;
        }
        return eventPos * this.viewOptions.scale - this.handleHalfDimension;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SliderComponent.prototype.getNearestHandle = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.range) {
            return PointerType.Min;
        }
        /** @type {?} */
        var position = this.getEventPosition(event);
        /** @type {?} */
        var distanceMin = Math.abs(position - this.minHandleElement.position);
        /** @type {?} */
        var distanceMax = Math.abs(position - this.maxHandleElement.position);
        if (distanceMin < distanceMax) {
            return PointerType.Min;
        }
        else if (distanceMin > distanceMax) {
            return PointerType.Max;
        }
        else if (!this.viewOptions.rightToLeft) {
            // if event is at the same distance from min/max then if it's at left of minH, we return minH else maxH
            return position < this.minHandleElement.position ? PointerType.Min : PointerType.Max;
        }
        // reverse in rtl
        return position > this.minHandleElement.position ? PointerType.Min : PointerType.Max;
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.bindEvents = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var draggableRange = this.viewOptions.draggableRange;
        if (!this.viewOptions.onlyBindHandles) {
            this.selectionBarElement.on('mousedown', function (event) { return _this.onBarStart(null, draggableRange, event, true, true, true); });
        }
        if (this.viewOptions.draggableRangeOnly) {
            this.minHandleElement.on('mousedown', function (event) { return _this.onBarStart(PointerType.Min, draggableRange, event, true, true); });
            this.maxHandleElement.on('mousedown', function (event) { return _this.onBarStart(PointerType.Max, draggableRange, event, true, true); });
        }
        else {
            this.minHandleElement.on('mousedown', function (event) { return _this.onStart(PointerType.Min, event, true, true); });
            if (this.range) {
                this.maxHandleElement.on('mousedown', function (event) { return _this.onStart(PointerType.Max, event, true, true); });
            }
            if (!this.viewOptions.onlyBindHandles) {
                this.fullBarElement.on('mousedown', function (event) { return _this.onStart(null, event, true, true, true); });
                this.ticksElement.on('mousedown', function (event) { return _this.onStart(null, event, true, true, true, true); });
            }
        }
        if (!this.viewOptions.onlyBindHandles) {
            this.selectionBarElement.onPassive('touchstart', function (event) { return _this.onBarStart(null, draggableRange, event, true, true, true); });
        }
        if (this.viewOptions.draggableRangeOnly) {
            this.minHandleElement.onPassive('touchstart', function (event) { return _this.onBarStart(PointerType.Min, draggableRange, event, true, true); });
            this.maxHandleElement.onPassive('touchstart', function (event) { return _this.onBarStart(PointerType.Max, draggableRange, event, true, true); });
        }
        else {
            this.minHandleElement.onPassive('touchstart', function (event) { return _this.onStart(PointerType.Min, event, true, true); });
            if (this.range) {
                this.maxHandleElement.onPassive('touchstart', function (event) { return _this.onStart(PointerType.Max, event, true, true); });
            }
            if (!this.viewOptions.onlyBindHandles) {
                this.fullBarElement.onPassive('touchstart', function (event) { return _this.onStart(null, event, true, true, true); });
                this.ticksElement.onPassive('touchstart', function (event) { return _this.onStart(null, event, false, false, true, true); });
            }
        }
        if (this.viewOptions.keyboardSupport) {
            this.minHandleElement.on('focus', function () { return _this.onPointerFocus(PointerType.Min); });
            if (this.range) {
                this.maxHandleElement.on('focus', function () { return _this.onPointerFocus(PointerType.Max); });
            }
        }
    };
    /**
     * @param {?} options
     * @return {?}
     */
    SliderComponent.prototype.getOptionsInfluencingEventBindings = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return [
            options.disabled,
            options.readOnly,
            options.draggableRange,
            options.draggableRangeOnly,
            options.onlyBindHandles,
            options.keyboardSupport
        ];
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.unbindEvents = /**
     * @return {?}
     */
    function () {
        this.unsubscribeOnMove();
        this.unsubscribeOnEnd();
        try {
            for (var _a = tslib_1.__values(this.getAllSliderElements()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var element = _b.value;
                if (!ValueHelper.isNullOrUndefined(element)) {
                    element.off();
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var e_3, _c;
    };
    /**
     * @param {?} pointerType
     * @param {?} draggableRange
     * @param {?} event
     * @param {?} bindMove
     * @param {?} bindEnd
     * @param {?=} simulateImmediateMove
     * @param {?=} simulateImmediateEnd
     * @return {?}
     */
    SliderComponent.prototype.onBarStart = /**
     * @param {?} pointerType
     * @param {?} draggableRange
     * @param {?} event
     * @param {?} bindMove
     * @param {?} bindEnd
     * @param {?=} simulateImmediateMove
     * @param {?=} simulateImmediateEnd
     * @return {?}
     */
    function (pointerType, draggableRange, event, bindMove, bindEnd, simulateImmediateMove, simulateImmediateEnd) {
        if (draggableRange) {
            this.onDragStart(pointerType, event, bindMove, bindEnd);
        }
        else {
            this.onStart(pointerType, event, bindMove, bindEnd, simulateImmediateMove, simulateImmediateEnd);
        }
    };
    /**
     * @param {?} pointerType
     * @param {?} event
     * @param {?} bindMove
     * @param {?} bindEnd
     * @param {?=} simulateImmediateMove
     * @param {?=} simulateImmediateEnd
     * @return {?}
     */
    SliderComponent.prototype.onStart = /**
     * @param {?} pointerType
     * @param {?} event
     * @param {?} bindMove
     * @param {?} bindEnd
     * @param {?=} simulateImmediateMove
     * @param {?=} simulateImmediateEnd
     * @return {?}
     */
    function (pointerType, event, bindMove, bindEnd, simulateImmediateMove, simulateImmediateEnd) {
        var _this = this;
        event.stopPropagation();
        // Only call preventDefault() when handling non-passive events (passive events don't need it)
        if (!CompatibilityHelper.isTouchEvent(event) || !detectPassiveEvents.hasSupport) {
            event.preventDefault();
        }
        this.moving = false;
        // We have to do this in case the HTML where the sliders are on
        // have been animated into view.
        this.calculateViewDimensions();
        if (ValueHelper.isNullOrUndefined(pointerType)) {
            pointerType = this.getNearestHandle(event);
        }
        this.currentTrackingPointer = pointerType;
        /** @type {?} */
        var pointerElement = this.getPointerElement(pointerType);
        pointerElement.active = true;
        if (this.viewOptions.keyboardSupport) {
            pointerElement.focus();
        }
        if (bindMove) {
            this.unsubscribeOnMove();
            /** @type {?} */
            var onMoveCallback = function (e) { return _this.dragging.active ? _this.onDragMove(e) : _this.onMove(e); };
            if (CompatibilityHelper.isTouchEvent(event)) {
                this.onMoveEventListener = this.eventListenerHelper.attachPassiveEventListener(document, 'touchmove', onMoveCallback, this.viewOptions.touchEventsInterval);
            }
            else {
                this.onMoveEventListener = this.eventListenerHelper.attachEventListener(document, 'mousemove', onMoveCallback, this.viewOptions.mouseEventsInterval);
            }
        }
        if (bindEnd) {
            this.unsubscribeOnEnd();
            /** @type {?} */
            var onEndCallback = function (e) { return _this.onEnd(e); };
            if (CompatibilityHelper.isTouchEvent(event)) {
                this.onEndEventListener = this.eventListenerHelper.attachPassiveEventListener(document, 'touchend', onEndCallback);
            }
            else {
                this.onEndEventListener = this.eventListenerHelper.attachEventListener(document, 'mouseup', onEndCallback);
            }
        }
        this.userChangeStart.emit(this.getChangeContext());
        if (CompatibilityHelper.isTouchEvent(event) && !ValueHelper.isNullOrUndefined((/** @type {?} */ (event)).changedTouches)) {
            // Store the touch identifier
            if (ValueHelper.isNullOrUndefined(this.touchId)) {
                this.touchId = (/** @type {?} */ (event)).changedTouches[0].identifier;
            }
        }
        // Click events, either with mouse or touch gesture are weird. Sometimes they result in full
        // start, move, end sequence, and sometimes, they don't - they only invoke mousedown
        // As a workaround, we simulate the first move event and the end event if it's necessary
        if (simulateImmediateMove) {
            this.onMove(event, true);
        }
        if (simulateImmediateEnd) {
            this.onEnd(event);
        }
    };
    /**
     * @param {?} event
     * @param {?=} fromTick
     * @return {?}
     */
    SliderComponent.prototype.onMove = /**
     * @param {?} event
     * @param {?=} fromTick
     * @return {?}
     */
    function (event, fromTick) {
        /** @type {?} */
        var touchForThisSlider = null;
        if (CompatibilityHelper.isTouchEvent(event)) {
            /** @type {?} */
            var changedTouches = (/** @type {?} */ (event)).changedTouches;
            for (var i = 0; i < changedTouches.length; i++) {
                if (changedTouches[i].identifier === this.touchId) {
                    touchForThisSlider = changedTouches[i];
                    break;
                }
            }
            if (ValueHelper.isNullOrUndefined(touchForThisSlider)) {
                return;
            }
        }
        if (this.viewOptions.animate && !this.viewOptions.animateOnMove) {
            if (this.moving) {
                this.sliderElementAnimateClass = false;
            }
        }
        this.moving = true;
        /** @type {?} */
        var newPos = !ValueHelper.isNullOrUndefined(touchForThisSlider)
            ? this.getEventPosition(event, touchForThisSlider.identifier)
            : this.getEventPosition(event);
        /** @type {?} */
        var newValue;
        /** @type {?} */
        var ceilValue = this.viewOptions.rightToLeft
            ? this.viewOptions.floor
            : this.viewOptions.ceil;
        /** @type {?} */
        var floorValue = this.viewOptions.rightToLeft ? this.viewOptions.ceil : this.viewOptions.floor;
        if (newPos <= 0) {
            newValue = floorValue;
        }
        else if (newPos >= this.maxHandlePosition) {
            newValue = ceilValue;
        }
        else {
            newValue = this.positionToValue(newPos);
            if (fromTick && !ValueHelper.isNullOrUndefined(this.viewOptions.tickStep)) {
                newValue = this.roundStep(newValue, this.viewOptions.tickStep);
            }
            else {
                newValue = this.roundStep(newValue);
            }
        }
        this.positionTrackingHandle(newValue);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SliderComponent.prototype.onEnd = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (CompatibilityHelper.isTouchEvent(event)) {
            /** @type {?} */
            var changedTouches = (/** @type {?} */ (event)).changedTouches;
            if (changedTouches[0].identifier !== this.touchId) {
                return;
            }
        }
        this.moving = false;
        if (this.viewOptions.animate) {
            this.sliderElementAnimateClass = true;
        }
        this.touchId = null;
        if (!this.viewOptions.keyboardSupport) {
            this.minHandleElement.active = false;
            this.maxHandleElement.active = false;
            this.currentTrackingPointer = null;
        }
        this.dragging.active = false;
        this.unsubscribeOnMove();
        this.unsubscribeOnEnd();
        this.userChangeEnd.emit(this.getChangeContext());
    };
    /**
     * @param {?} pointerType
     * @return {?}
     */
    SliderComponent.prototype.onPointerFocus = /**
     * @param {?} pointerType
     * @return {?}
     */
    function (pointerType) {
        var _this = this;
        /** @type {?} */
        var pointerElement = this.getPointerElement(pointerType);
        pointerElement.on('blur', function () { return _this.onPointerBlur(pointerElement); });
        pointerElement.on('keydown', function (event) { return _this.onKeyboardEvent(event); });
        pointerElement.on('keyup', function () { return _this.onKeyUp(); });
        pointerElement.active = true;
        this.currentTrackingPointer = pointerType;
        this.currentFocusPointer = pointerType;
        this.firstKeyDown = true;
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.onKeyUp = /**
     * @return {?}
     */
    function () {
        this.firstKeyDown = true;
        this.userChangeEnd.emit(this.getChangeContext());
    };
    /**
     * @param {?} pointer
     * @return {?}
     */
    SliderComponent.prototype.onPointerBlur = /**
     * @param {?} pointer
     * @return {?}
     */
    function (pointer) {
        pointer.off('blur');
        pointer.off('keydown');
        pointer.off('keyup');
        pointer.active = false;
        if (ValueHelper.isNullOrUndefined(this.touchId)) {
            this.currentTrackingPointer = null;
            this.currentFocusPointer = null;
        }
    };
    /**
     * @param {?} currentValue
     * @return {?}
     */
    SliderComponent.prototype.getKeyActions = /**
     * @param {?} currentValue
     * @return {?}
     */
    function (currentValue) {
        /** @type {?} */
        var valueRange = this.viewOptions.ceil - this.viewOptions.floor;
        /** @type {?} */
        var increaseStep = currentValue + this.viewOptions.step;
        /** @type {?} */
        var decreaseStep = currentValue - this.viewOptions.step;
        /** @type {?} */
        var increasePage = currentValue + valueRange / 10;
        /** @type {?} */
        var decreasePage = currentValue - valueRange / 10;
        if (this.viewOptions.reversedControls) {
            increaseStep = currentValue - this.viewOptions.step;
            decreaseStep = currentValue + this.viewOptions.step;
            increasePage = currentValue - valueRange / 10;
            decreasePage = currentValue + valueRange / 10;
        }
        /** @type {?} */
        var actions = {
            UP: increaseStep,
            DOWN: decreaseStep,
            LEFT: decreaseStep,
            RIGHT: increaseStep,
            PAGEUP: increasePage,
            PAGEDOWN: decreasePage,
            HOME: this.viewOptions.reversedControls ? this.viewOptions.ceil : this.viewOptions.floor,
            END: this.viewOptions.reversedControls ? this.viewOptions.floor : this.viewOptions.ceil,
        };
        // right to left means swapping right and left arrows
        if (this.viewOptions.rightToLeft) {
            actions["LEFT"] = increaseStep;
            actions["RIGHT"] = decreaseStep;
            // right to left and vertical means we also swap up and down
            if (this.viewOptions.vertical) {
                actions["UP"] = decreaseStep;
                actions["DOWN"] = increaseStep;
            }
        }
        return actions;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SliderComponent.prototype.onKeyboardEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var currentValue = this.getCurrentTrackingValue();
        /** @type {?} */
        var keyCode = !ValueHelper.isNullOrUndefined(event.keyCode)
            ? event.keyCode
            : event.which;
        /** @type {?} */
        var keys = {
            38: 'UP',
            40: 'DOWN',
            37: 'LEFT',
            39: 'RIGHT',
            33: 'PAGEUP',
            34: 'PAGEDOWN',
            36: 'HOME',
            35: 'END',
        };
        /** @type {?} */
        var actions = this.getKeyActions(currentValue);
        /** @type {?} */
        var key = keys[keyCode];
        /** @type {?} */
        var action = actions[key];
        if (ValueHelper.isNullOrUndefined(action) || ValueHelper.isNullOrUndefined(this.currentTrackingPointer)) {
            return;
        }
        event.preventDefault();
        if (this.firstKeyDown) {
            this.firstKeyDown = false;
            this.userChangeStart.emit(this.getChangeContext());
        }
        /** @type {?} */
        var actionValue = MathHelper.clampToRange(action, this.viewOptions.floor, this.viewOptions.ceil);
        /** @type {?} */
        var newValue = this.roundStep(actionValue);
        if (!this.viewOptions.draggableRangeOnly) {
            this.positionTrackingHandle(newValue);
        }
        else {
            /** @type {?} */
            var difference = this.viewHighValue - this.viewLowValue;
            /** @type {?} */
            var newMinValue = void 0;
            /** @type {?} */
            var newMaxValue = void 0;
            if (this.currentTrackingPointer === PointerType.Min) {
                newMinValue = newValue;
                newMaxValue = newValue + difference;
                if (newMaxValue > this.viewOptions.ceil) {
                    newMaxValue = this.viewOptions.ceil;
                    newMinValue = newMaxValue - difference;
                }
            }
            else if (this.currentTrackingPointer === PointerType.Max) {
                newMaxValue = newValue;
                newMinValue = newValue - difference;
                if (newMinValue < this.viewOptions.floor) {
                    newMinValue = this.viewOptions.floor;
                    newMaxValue = newMinValue + difference;
                }
            }
            this.positionTrackingBar(newMinValue, newMaxValue);
        }
    };
    /**
     * @param {?} pointerType
     * @param {?} event
     * @param {?} bindMove
     * @param {?} bindEnd
     * @return {?}
     */
    SliderComponent.prototype.onDragStart = /**
     * @param {?} pointerType
     * @param {?} event
     * @param {?} bindMove
     * @param {?} bindEnd
     * @return {?}
     */
    function (pointerType, event, bindMove, bindEnd) {
        /** @type {?} */
        var position = this.getEventPosition(event);
        this.dragging = new Dragging();
        this.dragging.active = true;
        this.dragging.value = this.positionToValue(position);
        this.dragging.difference = this.viewHighValue - this.viewLowValue;
        this.dragging.lowLimit = this.viewOptions.rightToLeft
            ? this.minHandleElement.position - position
            : position - this.minHandleElement.position;
        this.dragging.highLimit = this.viewOptions.rightToLeft
            ? position - this.maxHandleElement.position
            : this.maxHandleElement.position - position;
        this.onStart(pointerType, event, bindMove, bindEnd);
    };
    /**
     * Get min value depending on whether the newPos is outOfBounds above or below the bar and rightToLeft
     * @param {?} newPos
     * @param {?} outOfBounds
     * @param {?} isAbove
     * @return {?}
     */
    SliderComponent.prototype.getMinValue = /**
     * Get min value depending on whether the newPos is outOfBounds above or below the bar and rightToLeft
     * @param {?} newPos
     * @param {?} outOfBounds
     * @param {?} isAbove
     * @return {?}
     */
    function (newPos, outOfBounds, isAbove) {
        /** @type {?} */
        var isRTL = this.viewOptions.rightToLeft;
        /** @type {?} */
        var value = null;
        if (outOfBounds) {
            if (isAbove) {
                value = isRTL
                    ? this.viewOptions.floor
                    : this.viewOptions.ceil - this.dragging.difference;
            }
            else {
                value = isRTL
                    ? this.viewOptions.ceil - this.dragging.difference
                    : this.viewOptions.floor;
            }
        }
        else {
            value = isRTL
                ? this.positionToValue(newPos + this.dragging.lowLimit)
                : this.positionToValue(newPos - this.dragging.lowLimit);
        }
        return this.roundStep(value);
    };
    /**
     * Get max value depending on whether the newPos is outOfBounds above or below the bar and rightToLeft
     * @param {?} newPos
     * @param {?} outOfBounds
     * @param {?} isAbove
     * @return {?}
     */
    SliderComponent.prototype.getMaxValue = /**
     * Get max value depending on whether the newPos is outOfBounds above or below the bar and rightToLeft
     * @param {?} newPos
     * @param {?} outOfBounds
     * @param {?} isAbove
     * @return {?}
     */
    function (newPos, outOfBounds, isAbove) {
        /** @type {?} */
        var isRTL = this.viewOptions.rightToLeft;
        /** @type {?} */
        var value = null;
        if (outOfBounds) {
            if (isAbove) {
                value = isRTL
                    ? this.viewOptions.floor + this.dragging.difference
                    : this.viewOptions.ceil;
            }
            else {
                value = isRTL
                    ? this.viewOptions.ceil
                    : this.viewOptions.floor + this.dragging.difference;
            }
        }
        else {
            if (isRTL) {
                value =
                    this.positionToValue(newPos + this.dragging.lowLimit) +
                        this.dragging.difference;
            }
            else {
                value =
                    this.positionToValue(newPos - this.dragging.lowLimit) +
                        this.dragging.difference;
            }
        }
        return this.roundStep(value);
    };
    /**
     * @param {?=} event
     * @return {?}
     */
    SliderComponent.prototype.onDragMove = /**
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var newPos = this.getEventPosition(event);
        if (this.viewOptions.animate && !this.viewOptions.animateOnMove) {
            if (this.moving) {
                this.sliderElementAnimateClass = false;
            }
        }
        this.moving = true;
        /** @type {?} */
        var ceilLimit;
        /** @type {?} */
        var floorLimit;
        /** @type {?} */
        var floorHandleElement;
        /** @type {?} */
        var ceilHandleElement;
        if (this.viewOptions.rightToLeft) {
            ceilLimit = this.dragging.lowLimit;
            floorLimit = this.dragging.highLimit;
            floorHandleElement = this.maxHandleElement;
            ceilHandleElement = this.minHandleElement;
        }
        else {
            ceilLimit = this.dragging.highLimit;
            floorLimit = this.dragging.lowLimit;
            floorHandleElement = this.minHandleElement;
            ceilHandleElement = this.maxHandleElement;
        }
        /** @type {?} */
        var isUnderFloorLimit = (newPos <= floorLimit);
        /** @type {?} */
        var isOverCeilLimit = (newPos >= this.maxHandlePosition - ceilLimit);
        /** @type {?} */
        var newMinValue;
        /** @type {?} */
        var newMaxValue;
        if (isUnderFloorLimit) {
            if (floorHandleElement.position === 0) {
                return;
            }
            newMinValue = this.getMinValue(newPos, true, false);
            newMaxValue = this.getMaxValue(newPos, true, false);
        }
        else if (isOverCeilLimit) {
            if (ceilHandleElement.position === this.maxHandlePosition) {
                return;
            }
            newMaxValue = this.getMaxValue(newPos, true, true);
            newMinValue = this.getMinValue(newPos, true, true);
        }
        else {
            newMinValue = this.getMinValue(newPos, false, false);
            newMaxValue = this.getMaxValue(newPos, false, false);
        }
        this.positionTrackingBar(newMinValue, newMaxValue);
    };
    /**
     * @param {?} newMinValue
     * @param {?} newMaxValue
     * @return {?}
     */
    SliderComponent.prototype.positionTrackingBar = /**
     * @param {?} newMinValue
     * @param {?} newMaxValue
     * @return {?}
     */
    function (newMinValue, newMaxValue) {
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.minLimit) &&
            newMinValue < this.viewOptions.minLimit) {
            newMinValue = this.viewOptions.minLimit;
            newMaxValue = MathHelper.roundToPrecisionLimit(newMinValue + this.dragging.difference, this.viewOptions.precisionLimit);
        }
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.maxLimit) &&
            newMaxValue > this.viewOptions.maxLimit) {
            newMaxValue = this.viewOptions.maxLimit;
            newMinValue = MathHelper.roundToPrecisionLimit(newMaxValue - this.dragging.difference, this.viewOptions.precisionLimit);
        }
        this.viewLowValue = newMinValue;
        this.viewHighValue = newMaxValue;
        this.applyViewChange();
        this.updateHandles(PointerType.Min, this.valueToPosition(newMinValue));
        this.updateHandles(PointerType.Max, this.valueToPosition(newMaxValue));
    };
    /**
     * @param {?} newValue
     * @return {?}
     */
    SliderComponent.prototype.positionTrackingHandle = /**
     * @param {?} newValue
     * @return {?}
     */
    function (newValue) {
        newValue = this.applyMinMaxLimit(newValue);
        if (this.range) {
            if (this.viewOptions.pushRange) {
                newValue = this.applyPushRange(newValue);
            }
            else {
                if (this.viewOptions.noSwitching) {
                    if (this.currentTrackingPointer === PointerType.Min &&
                        newValue > this.viewHighValue) {
                        newValue = this.applyMinMaxRange(this.viewHighValue);
                    }
                    else if (this.currentTrackingPointer === PointerType.Max &&
                        newValue < this.viewLowValue) {
                        newValue = this.applyMinMaxRange(this.viewLowValue);
                    }
                }
                newValue = this.applyMinMaxRange(newValue);
                /* This is to check if we need to switch the min and max handles */
                if (this.currentTrackingPointer === PointerType.Min && newValue > this.viewHighValue) {
                    this.viewLowValue = this.viewHighValue;
                    this.applyViewChange();
                    this.updateHandles(PointerType.Min, this.maxHandleElement.position);
                    this.updateAriaAttributes();
                    this.currentTrackingPointer = PointerType.Max;
                    this.minHandleElement.active = false;
                    this.maxHandleElement.active = true;
                    if (this.viewOptions.keyboardSupport) {
                        this.maxHandleElement.focus();
                    }
                }
                else if (this.currentTrackingPointer === PointerType.Max &&
                    newValue < this.viewLowValue) {
                    this.viewHighValue = this.viewLowValue;
                    this.applyViewChange();
                    this.updateHandles(PointerType.Max, this.minHandleElement.position);
                    this.updateAriaAttributes();
                    this.currentTrackingPointer = PointerType.Min;
                    this.maxHandleElement.active = false;
                    this.minHandleElement.active = true;
                    if (this.viewOptions.keyboardSupport) {
                        this.minHandleElement.focus();
                    }
                }
            }
        }
        if (this.getCurrentTrackingValue() !== newValue) {
            if (this.currentTrackingPointer === PointerType.Min) {
                this.viewLowValue = newValue;
                this.applyViewChange();
            }
            else if (this.currentTrackingPointer === PointerType.Max) {
                this.viewHighValue = newValue;
                this.applyViewChange();
            }
            this.updateHandles(this.currentTrackingPointer, this.valueToPosition(newValue));
            this.updateAriaAttributes();
        }
    };
    /**
     * @param {?} newValue
     * @return {?}
     */
    SliderComponent.prototype.applyMinMaxLimit = /**
     * @param {?} newValue
     * @return {?}
     */
    function (newValue) {
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.minLimit) && newValue < this.viewOptions.minLimit) {
            return this.viewOptions.minLimit;
        }
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.maxLimit) && newValue > this.viewOptions.maxLimit) {
            return this.viewOptions.maxLimit;
        }
        return newValue;
    };
    /**
     * @param {?} newValue
     * @return {?}
     */
    SliderComponent.prototype.applyMinMaxRange = /**
     * @param {?} newValue
     * @return {?}
     */
    function (newValue) {
        /** @type {?} */
        var oppositeValue = (this.currentTrackingPointer === PointerType.Min)
            ? this.viewHighValue
            : this.viewLowValue;
        /** @type {?} */
        var difference = Math.abs(newValue - oppositeValue);
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.minRange)) {
            if (difference < this.viewOptions.minRange) {
                if (this.currentTrackingPointer === PointerType.Min) {
                    return MathHelper.roundToPrecisionLimit(this.viewHighValue - this.viewOptions.minRange, this.viewOptions.precisionLimit);
                }
                else if (this.currentTrackingPointer === PointerType.Max) {
                    return MathHelper.roundToPrecisionLimit(this.viewLowValue + this.viewOptions.minRange, this.viewOptions.precisionLimit);
                }
            }
        }
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.maxRange)) {
            if (difference > this.viewOptions.maxRange) {
                if (this.currentTrackingPointer === PointerType.Min) {
                    return MathHelper.roundToPrecisionLimit(this.viewHighValue - this.viewOptions.maxRange, this.viewOptions.precisionLimit);
                }
                else if (this.currentTrackingPointer === PointerType.Max) {
                    return MathHelper.roundToPrecisionLimit(this.viewLowValue + this.viewOptions.maxRange, this.viewOptions.precisionLimit);
                }
            }
        }
        return newValue;
    };
    /**
     * @param {?} newValue
     * @return {?}
     */
    SliderComponent.prototype.applyPushRange = /**
     * @param {?} newValue
     * @return {?}
     */
    function (newValue) {
        /** @type {?} */
        var difference = (this.currentTrackingPointer === PointerType.Min)
            ? this.viewHighValue - newValue
            : newValue - this.viewLowValue;
        /** @type {?} */
        var minRange = (!ValueHelper.isNullOrUndefined(this.viewOptions.minRange))
            ? this.viewOptions.minRange
            : this.viewOptions.step;
        /** @type {?} */
        var maxRange = this.viewOptions.maxRange;
        // if smaller than minRange
        if (difference < minRange) {
            if (this.currentTrackingPointer === PointerType.Min) {
                this.viewHighValue = MathHelper.roundToPrecisionLimit(Math.min(newValue + minRange, this.viewOptions.ceil), this.viewOptions.precisionLimit);
                newValue = MathHelper.roundToPrecisionLimit(this.viewHighValue - minRange, this.viewOptions.precisionLimit);
                this.applyViewChange();
                this.updateHandles(PointerType.Max, this.valueToPosition(this.viewHighValue));
            }
            else if (this.currentTrackingPointer === PointerType.Max) {
                this.viewLowValue = MathHelper.roundToPrecisionLimit(Math.max(newValue - minRange, this.viewOptions.floor), this.viewOptions.precisionLimit);
                newValue = MathHelper.roundToPrecisionLimit(this.viewLowValue + minRange, this.viewOptions.precisionLimit);
                this.applyViewChange();
                this.updateHandles(PointerType.Min, this.valueToPosition(this.viewLowValue));
            }
            this.updateAriaAttributes();
        }
        else if (!ValueHelper.isNullOrUndefined(maxRange) && difference > maxRange) {
            // if greater than maxRange
            if (this.currentTrackingPointer === PointerType.Min) {
                this.viewHighValue = MathHelper.roundToPrecisionLimit(newValue + maxRange, this.viewOptions.precisionLimit);
                this.applyViewChange();
                this.updateHandles(PointerType.Max, this.valueToPosition(this.viewHighValue));
            }
            else if (this.currentTrackingPointer === PointerType.Max) {
                this.viewLowValue = MathHelper.roundToPrecisionLimit(newValue - maxRange, this.viewOptions.precisionLimit);
                this.applyViewChange();
                this.updateHandles(PointerType.Min, this.valueToPosition(this.viewLowValue));
            }
            this.updateAriaAttributes();
        }
        return newValue;
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.getChangeContext = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var changeContext = new ChangeContext();
        changeContext.pointerType = this.currentTrackingPointer;
        changeContext.value = +this.value;
        if (this.range) {
            changeContext.highValue = +this.highValue;
        }
        return changeContext;
    };
    SliderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-slider',
                    template: "<!-- // 0 Left selection bar outside two handles -->\n<span ngxSliderElement #leftOuterSelectionBar class=\"ngx-slider-span ngx-slider-bar-wrapper ngx-slider-left-out-selection\">\n  <span class=\"ngx-slider-span ngx-slider-bar\"></span>\n</span>\n<!-- // 1 Right selection bar outside two handles -->\n<span ngxSliderElement #rightOuterSelectionBar class=\"ngx-slider-span ngx-slider-bar-wrapper ngx-slider-right-out-selection\">\n  <span class=\"ngx-slider-span ngx-slider-bar\"></span>\n</span>\n<!-- // 2 The whole slider bar -->\n<span ngxSliderElement #fullBar [class.ngx-slider-transparent]=\"fullBarTransparentClass\" class=\"ngx-slider-span ngx-slider-bar-wrapper ngx-slider-full-bar\">\n  <span class=\"ngx-slider-span ngx-slider-bar\"></span>\n</span>\n<!-- // 3 Selection bar between two handles -->\n<span ngxSliderElement #selectionBar [class.ngx-slider-draggable]=\"selectionBarDraggableClass\" class=\"ngx-slider-span ngx-slider-bar-wrapper ngx-slider-selection-bar\">\n  <span class=\"ngx-slider-span ngx-slider-bar ngx-slider-selection\" [ngStyle]=\"barStyle\"></span>\n</span>\n<!-- // 4 Low slider handle -->\n<span ngxSliderHandle #minHandle class=\"ngx-slider-span ngx-slider-pointer ngx-slider-pointer-min\" [ngStyle]=minPointerStyle></span>\n<!-- // 5 High slider handle -->\n<span ngxSliderHandle #maxHandle [style.display]=\"range ? 'inherit' : 'none'\" class=\"ngx-slider-span ngx-slider-pointer ngx-slider-pointer-max\" [ngStyle]=maxPointerStyle></span>\n<!-- // 6 Floor label -->\n<span ngxSliderLabel #floorLabel class=\"ngx-slider-span ngx-slider-bubble ngx-slider-limit ngx-slider-floor\"></span>\n<!-- // 7 Ceiling label -->\n<span ngxSliderLabel #ceilLabel class=\"ngx-slider-span ngx-slider-bubble ngx-slider-limit ngx-slider-ceil\"></span>\n<!-- // 8 Label above the low slider handle -->\n<span ngxSliderLabel #minHandleLabel class=\"ngx-slider-span ngx-slider-bubble ngx-slider-model-value\"></span>\n<!-- // 9 Label above the high slider handle -->\n<span ngxSliderLabel #maxHandleLabel class=\"ngx-slider-span ngx-slider-bubble ngx-slider-model-high\"></span>\n<!-- // 10 Combined range label when the slider handles are close ex. 15 - 17 -->\n<span ngxSliderLabel #combinedLabel class=\"ngx-slider-span ngx-slider-bubble ngx-slider-combined\"></span>\n<!-- // 11 The ticks -->\n<span ngxSliderElement #ticksElement [hidden]=\"!showTicks\" [class.ngx-slider-ticks-values-under]=\"ticksUnderValuesClass\" class=\"ngx-slider-ticks\">\n  <span *ngFor=\"let t of ticks\" class=\"ngx-slider-tick\" [ngClass]=\"{'ngx-slider-selected': t.selected}\" [ngStyle]=\"t.style\">\n    <ngx-slider-tooltip-wrapper [template]=\"tooltipTemplate\" [tooltip]=\"t.tooltip\" [placement]=\"t.tooltipPlacement\"></ngx-slider-tooltip-wrapper>\n    <ngx-slider-tooltip-wrapper *ngIf=\"t.value != null\" class=\"ngx-slider-span ngx-slider-tick-value\"\n        [template]=\"tooltipTemplate\" [tooltip]=\"t.valueTooltip\" [placement]=\"t.valueTooltipPlacement\" [content]=\"t.value\"></ngx-slider-tooltip-wrapper>\n    <span *ngIf=\"t.legend != null\" class=\"ngx-slider-span ngx-slider-tick-legend\" [innerHTML]=\"t.legend\"></span>\n  </span>\n</span>",
                    styles: ["::ng-deep .ngx-slider{display:inline-block;position:relative;height:4px;width:100%;margin:35px 0 15px;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;touch-action:pan-y}::ng-deep .ngx-slider.with-legend{margin-bottom:40px}::ng-deep .ngx-slider[disabled]{cursor:not-allowed}::ng-deep .ngx-slider[disabled] .ngx-slider-pointer{cursor:not-allowed;background-color:#d8e0f3}::ng-deep .ngx-slider[disabled] .ngx-slider-draggable{cursor:not-allowed}::ng-deep .ngx-slider[disabled] .ngx-slider-selection{background:#8b91a2}::ng-deep .ngx-slider[disabled] .ngx-slider-tick{cursor:not-allowed}::ng-deep .ngx-slider[disabled] .ngx-slider-tick.ngx-slider-selected{background:#8b91a2}::ng-deep .ngx-slider .ngx-slider-span{white-space:nowrap;position:absolute;display:inline-block}::ng-deep .ngx-slider .ngx-slider-base{width:100%;height:100%;padding:0}::ng-deep .ngx-slider .ngx-slider-bar-wrapper{left:0;box-sizing:border-box;margin-top:-16px;padding-top:16px;width:100%;height:32px;z-index:1}::ng-deep .ngx-slider .ngx-slider-draggable{cursor:move}::ng-deep .ngx-slider .ngx-slider-bar{left:0;width:100%;height:4px;z-index:1;background:#d8e0f3;border-radius:2px}::ng-deep .ngx-slider .ngx-slider-bar-wrapper.ngx-slider-transparent .ngx-slider-bar{background:0 0}::ng-deep .ngx-slider .ngx-slider-bar-wrapper.ngx-slider-left-out-selection .ngx-slider-bar{background:#df002d}::ng-deep .ngx-slider .ngx-slider-bar-wrapper.ngx-slider-right-out-selection .ngx-slider-bar{background:#03a688}::ng-deep .ngx-slider .ngx-slider-selection{z-index:2;background:#0db9f0;border-radius:2px}::ng-deep .ngx-slider .ngx-slider-pointer{cursor:pointer;width:32px;height:32px;top:-14px;background-color:#0db9f0;z-index:3;border-radius:16px}::ng-deep .ngx-slider .ngx-slider-pointer:after{content:'';width:8px;height:8px;position:absolute;top:12px;left:12px;border-radius:4px;background:#fff}::ng-deep .ngx-slider .ngx-slider-pointer:hover:after{background-color:#fff}::ng-deep .ngx-slider .ngx-slider-pointer.ngx-slider-active{z-index:4}::ng-deep .ngx-slider .ngx-slider-pointer.ngx-slider-active:after{background-color:#451aff}::ng-deep .ngx-slider .ngx-slider-bubble{cursor:default;bottom:16px;padding:1px 3px;color:#55637d;font-size:16px}::ng-deep .ngx-slider .ngx-slider-bubble.ngx-slider-limit{color:#55637d}::ng-deep .ngx-slider .ngx-slider-ticks{box-sizing:border-box;width:100%;height:0;position:absolute;left:0;top:-3px;margin:0;z-index:1;list-style:none}::ng-deep .ngx-slider .ngx-slider-ticks-values-under .ngx-slider-tick-value{top:auto;bottom:-36px}::ng-deep .ngx-slider .ngx-slider-tick{text-align:center;cursor:pointer;width:10px;height:10px;background:#d8e0f3;border-radius:50%;position:absolute;top:0;left:0;margin-left:11px}::ng-deep .ngx-slider .ngx-slider-tick.ngx-slider-selected{background:#0db9f0}::ng-deep .ngx-slider .ngx-slider-tick-value{position:absolute;top:-34px;-webkit-transform:translate(-50%,0);transform:translate(-50%,0)}::ng-deep .ngx-slider .ngx-slider-tick-legend{position:absolute;top:24px;-webkit-transform:translate(-50%,0);transform:translate(-50%,0);max-width:50px;white-space:normal}::ng-deep .ngx-slider.vertical{position:relative;width:4px;height:100%;margin:0 20px;padding:0;vertical-align:baseline;touch-action:pan-x}::ng-deep .ngx-slider.vertical .ngx-slider-base{width:100%;height:100%;padding:0}::ng-deep .ngx-slider.vertical .ngx-slider-bar-wrapper{top:auto;left:0;margin:0 0 0 -16px;padding:0 0 0 16px;height:100%;width:32px}::ng-deep .ngx-slider.vertical .ngx-slider-bar{bottom:0;left:auto;width:4px;height:100%}::ng-deep .ngx-slider.vertical .ngx-slider-pointer{left:-14px!important;top:auto;bottom:0}::ng-deep .ngx-slider.vertical .ngx-slider-bubble{left:16px!important;bottom:0}::ng-deep .ngx-slider.vertical .ngx-slider-ticks{height:100%;width:0;left:-3px;top:0;z-index:1}::ng-deep .ngx-slider.vertical .ngx-slider-tick{vertical-align:middle;margin-left:auto;margin-top:11px}::ng-deep .ngx-slider.vertical .ngx-slider-tick-value{left:24px;top:auto;-webkit-transform:translate(0,-28%);transform:translate(0,-28%)}::ng-deep .ngx-slider.vertical .ngx-slider-tick-legend{top:auto;right:24px;-webkit-transform:translate(0,-28%);transform:translate(0,-28%);max-width:none;white-space:nowrap}::ng-deep .ngx-slider.vertical .ngx-slider-ticks-values-under .ngx-slider-tick-value{bottom:auto;left:auto;right:24px}::ng-deep .ngx-slider *{transition:none}::ng-deep .ngx-slider.animate .ngx-slider-bar-wrapper{transition:.3s linear}::ng-deep .ngx-slider.animate .ngx-slider-selection{transition:background-color .3s linear}::ng-deep .ngx-slider.animate .ngx-slider-pointer{transition:.3s linear}::ng-deep .ngx-slider.animate .ngx-slider-bubble{transition:.3s linear}::ng-deep .ngx-slider.animate .ngx-slider-bubble.ngx-slider-limit{transition:opacity .3s linear}::ng-deep .ngx-slider.animate .ngx-slider-bubble.ngx-slider-combined{transition:opacity .3s linear}::ng-deep .ngx-slider.animate .ngx-slider-tick{transition:background-color .3s linear}"],
                    host: { class: 'ngx-slider' },
                    providers: [NGX_SLIDER_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    SliderComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    SliderComponent.propDecorators = {
        value: [{ type: Input }],
        valueChange: [{ type: Output }],
        highValue: [{ type: Input }],
        highValueChange: [{ type: Output }],
        options: [{ type: Input }],
        userChangeStart: [{ type: Output }],
        userChange: [{ type: Output }],
        userChangeEnd: [{ type: Output }],
        manualRefresh: [{ type: Input }],
        triggerFocus: [{ type: Input }],
        leftOuterSelectionBarElement: [{ type: ViewChild, args: ['leftOuterSelectionBar', { read: SliderElementDirective },] }],
        rightOuterSelectionBarElement: [{ type: ViewChild, args: ['rightOuterSelectionBar', { read: SliderElementDirective },] }],
        fullBarElement: [{ type: ViewChild, args: ['fullBar', { read: SliderElementDirective },] }],
        selectionBarElement: [{ type: ViewChild, args: ['selectionBar', { read: SliderElementDirective },] }],
        minHandleElement: [{ type: ViewChild, args: ['minHandle', { read: SliderHandleDirective },] }],
        maxHandleElement: [{ type: ViewChild, args: ['maxHandle', { read: SliderHandleDirective },] }],
        floorLabelElement: [{ type: ViewChild, args: ['floorLabel', { read: SliderLabelDirective },] }],
        ceilLabelElement: [{ type: ViewChild, args: ['ceilLabel', { read: SliderLabelDirective },] }],
        minHandleLabelElement: [{ type: ViewChild, args: ['minHandleLabel', { read: SliderLabelDirective },] }],
        maxHandleLabelElement: [{ type: ViewChild, args: ['maxHandleLabel', { read: SliderLabelDirective },] }],
        combinedLabelElement: [{ type: ViewChild, args: ['combinedLabel', { read: SliderLabelDirective },] }],
        ticksElement: [{ type: ViewChild, args: ['ticksElement', { read: SliderElementDirective },] }],
        tooltipTemplate: [{ type: ContentChild, args: ['tooltipTemplate',] }],
        sliderElementVerticalClass: [{ type: HostBinding, args: ['class.vertical',] }],
        sliderElementAnimateClass: [{ type: HostBinding, args: ['class.animate',] }],
        sliderElementWithLegendClass: [{ type: HostBinding, args: ['class.with-legend',] }],
        sliderElementDisabledAttr: [{ type: HostBinding, args: ['attr.disabled',] }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return SliderComponent;
}());
export { SliderComponent };
if (false) {
    /** @type {?} */
    SliderComponent.prototype.value;
    /** @type {?} */
    SliderComponent.prototype.valueChange;
    /** @type {?} */
    SliderComponent.prototype.highValue;
    /** @type {?} */
    SliderComponent.prototype.highValueChange;
    /** @type {?} */
    SliderComponent.prototype.options;
    /** @type {?} */
    SliderComponent.prototype.userChangeStart;
    /** @type {?} */
    SliderComponent.prototype.userChange;
    /** @type {?} */
    SliderComponent.prototype.userChangeEnd;
    /** @type {?} */
    SliderComponent.prototype.manualRefreshSubscription;
    /** @type {?} */
    SliderComponent.prototype.triggerFocusSubscription;
    /** @type {?} */
    SliderComponent.prototype.initHasRun;
    /** @type {?} */
    SliderComponent.prototype.inputModelChangeSubject;
    /** @type {?} */
    SliderComponent.prototype.inputModelChangeSubscription;
    /** @type {?} */
    SliderComponent.prototype.outputModelChangeSubject;
    /** @type {?} */
    SliderComponent.prototype.outputModelChangeSubscription;
    /** @type {?} */
    SliderComponent.prototype.viewLowValue;
    /** @type {?} */
    SliderComponent.prototype.viewHighValue;
    /** @type {?} */
    SliderComponent.prototype.viewOptions;
    /** @type {?} */
    SliderComponent.prototype.handleHalfDimension;
    /** @type {?} */
    SliderComponent.prototype.maxHandlePosition;
    /** @type {?} */
    SliderComponent.prototype.currentTrackingPointer;
    /** @type {?} */
    SliderComponent.prototype.currentFocusPointer;
    /** @type {?} */
    SliderComponent.prototype.firstKeyDown;
    /** @type {?} */
    SliderComponent.prototype.touchId;
    /** @type {?} */
    SliderComponent.prototype.dragging;
    /** @type {?} */
    SliderComponent.prototype.leftOuterSelectionBarElement;
    /** @type {?} */
    SliderComponent.prototype.rightOuterSelectionBarElement;
    /** @type {?} */
    SliderComponent.prototype.fullBarElement;
    /** @type {?} */
    SliderComponent.prototype.selectionBarElement;
    /** @type {?} */
    SliderComponent.prototype.minHandleElement;
    /** @type {?} */
    SliderComponent.prototype.maxHandleElement;
    /** @type {?} */
    SliderComponent.prototype.floorLabelElement;
    /** @type {?} */
    SliderComponent.prototype.ceilLabelElement;
    /** @type {?} */
    SliderComponent.prototype.minHandleLabelElement;
    /** @type {?} */
    SliderComponent.prototype.maxHandleLabelElement;
    /** @type {?} */
    SliderComponent.prototype.combinedLabelElement;
    /** @type {?} */
    SliderComponent.prototype.ticksElement;
    /** @type {?} */
    SliderComponent.prototype.tooltipTemplate;
    /** @type {?} */
    SliderComponent.prototype.sliderElementVerticalClass;
    /** @type {?} */
    SliderComponent.prototype.sliderElementAnimateClass;
    /** @type {?} */
    SliderComponent.prototype.sliderElementWithLegendClass;
    /** @type {?} */
    SliderComponent.prototype.sliderElementDisabledAttr;
    /** @type {?} */
    SliderComponent.prototype.barStyle;
    /** @type {?} */
    SliderComponent.prototype.minPointerStyle;
    /** @type {?} */
    SliderComponent.prototype.maxPointerStyle;
    /** @type {?} */
    SliderComponent.prototype.fullBarTransparentClass;
    /** @type {?} */
    SliderComponent.prototype.selectionBarDraggableClass;
    /** @type {?} */
    SliderComponent.prototype.ticksUnderValuesClass;
    /** @type {?} */
    SliderComponent.prototype.intermediateTicks;
    /** @type {?} */
    SliderComponent.prototype.ticks;
    /** @type {?} */
    SliderComponent.prototype.eventListenerHelper;
    /** @type {?} */
    SliderComponent.prototype.onMoveEventListener;
    /** @type {?} */
    SliderComponent.prototype.onEndEventListener;
    /** @type {?} */
    SliderComponent.prototype.moving;
    /** @type {?} */
    SliderComponent.prototype.resizeObserver;
    /** @type {?} */
    SliderComponent.prototype.onTouchedCallback;
    /** @type {?} */
    SliderComponent.prototype.onChangeCallback;
    /** @type {?} */
    SliderComponent.prototype.renderer;
    /** @type {?} */
    SliderComponent.prototype.elementRef;
    /** @type {?} */
    SliderComponent.prototype.changeDetectionRef;
    /** @type {?} */
    SliderComponent.prototype.zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXNsaWRlci9uZ3gtc2xpZGVyLyIsInNvdXJjZXMiOlsic2xpZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsU0FBUyxFQUlULFdBQVcsRUFDWCxZQUFZLEVBQ1osS0FBSyxFQUNMLFVBQVUsRUFDVixTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixZQUFZLEVBQ1osV0FBVyxFQUNYLGlCQUFpQixFQUVqQixVQUFVLEVBQ1YsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxPQUFPLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRixPQUFPLG1CQUFtQixNQUFNLHVCQUF1QixDQUFDO0FBRXhELE9BQU8sRUFDTCxPQUFPLEVBQ1AsU0FBUyxFQUlWLE1BQU0sV0FBVyxDQUFDO0FBQ25CLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLHFCQUFx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V0FBVyxTQUFDLGVBQWU7K0NBRTNCLFdBQVcsU0FBQyxtQkFBbUI7NENBRS9CLFdBQVcsU0FBQyxlQUFlOzJCQTZKM0IsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7MEJBamUzQzs7U0EwS2EsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGQsXG4gIEFmdGVyVmlld0luaXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgRWxlbWVudFJlZixcbiAgUmVuZGVyZXIyLFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dCxcbiAgQ29udGVudENoaWxkLFxuICBUZW1wbGF0ZVJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIGZvcndhcmRSZWYsXG4gIE5nWm9uZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIHRocm90dGxlVGltZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgZGV0ZWN0UGFzc2l2ZUV2ZW50cyBmcm9tICdkZXRlY3QtcGFzc2l2ZS1ldmVudHMnO1xuXG5pbXBvcnQge1xuICBPcHRpb25zLFxuICBMYWJlbFR5cGUsXG4gIFZhbHVlVG9Qb3NpdGlvbkZ1bmN0aW9uLFxuICBQb3NpdGlvblRvVmFsdWVGdW5jdGlvbixcbiAgQ3VzdG9tU3RlcERlZmluaXRpb25cbn0gZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCB7IFBvaW50ZXJUeXBlIH0gZnJvbSAnLi9wb2ludGVyLXR5cGUnO1xuaW1wb3J0IHsgQ2hhbmdlQ29udGV4dCB9IGZyb20gJy4vY2hhbmdlLWNvbnRleHQnO1xuaW1wb3J0IHsgVmFsdWVIZWxwZXIgfSBmcm9tICcuL3ZhbHVlLWhlbHBlcic7XG5pbXBvcnQgeyBDb21wYXRpYmlsaXR5SGVscGVyIH0gZnJvbSAnLi9jb21wYXRpYmlsaXR5LWhlbHBlcic7XG5pbXBvcnQgeyBNYXRoSGVscGVyIH0gZnJvbSAnLi9tYXRoLWhlbHBlcic7XG5pbXBvcnQgeyBFdmVudExpc3RlbmVyIH0gZnJvbSAnLi9ldmVudC1saXN0ZW5lcic7XG5pbXBvcnQgeyBFdmVudExpc3RlbmVySGVscGVyIH0gZnJvbSAnLi9ldmVudC1saXN0ZW5lci1oZWxwZXInO1xuaW1wb3J0IHsgU2xpZGVyRWxlbWVudERpcmVjdGl2ZSB9IGZyb20gJy4vc2xpZGVyLWVsZW1lbnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNsaWRlckhhbmRsZURpcmVjdGl2ZSB9IGZyb20gJy4vc2xpZGVyLWhhbmRsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2xpZGVyTGFiZWxEaXJlY3RpdmUgfSBmcm9tICcuL3NsaWRlci1sYWJlbC5kaXJlY3RpdmUnO1xuXG4vLyBEZWNsYXJhdGlvbiBmb3IgUmVzaXplT2JzZXJ2ZXIgYSBuZXcgQVBJIGF2YWlsYWJsZSBpbiBzb21lIG9mIG5ld2VzdCBicm93c2Vyczpcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9SZXNpemVPYnNlcnZlclxuZGVjbGFyZSBjbGFzcyBSZXNpemVPYnNlcnZlciB7XG4gIGNvbnN0cnVjdG9yKGNhbGxiYWNrOiAoKSA9PiB2b2lkKTtcbiAgb2JzZXJ2ZSh0YXJnZXQ6IGFueSk6IHZvaWQ7XG4gIHVub2JzZXJ2ZSh0YXJnZXQ6IGFueSk6IHZvaWQ7XG4gIGRpc2Nvbm5lY3QoKTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFRpY2sge1xuICBzZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBzdHlsZTogYW55ID0ge307XG4gIHRvb2x0aXA6IHN0cmluZyA9IG51bGw7XG4gIHRvb2x0aXBQbGFjZW1lbnQ6IHN0cmluZyA9IG51bGw7XG4gIHZhbHVlOiBzdHJpbmcgPSBudWxsO1xuICB2YWx1ZVRvb2x0aXA6IHN0cmluZyA9IG51bGw7XG4gIHZhbHVlVG9vbHRpcFBsYWNlbWVudDogc3RyaW5nID0gbnVsbDtcbiAgbGVnZW5kOiBzdHJpbmcgPSBudWxsO1xufVxuXG5jbGFzcyBEcmFnZ2luZyB7XG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICB2YWx1ZTogbnVtYmVyID0gMDtcbiAgZGlmZmVyZW5jZTogbnVtYmVyID0gMDtcbiAgcG9zaXRpb246IG51bWJlciA9IDA7XG4gIGxvd0xpbWl0OiBudW1iZXIgPSAwO1xuICBoaWdoTGltaXQ6IG51bWJlciA9IDA7XG59XG5cbmNsYXNzIE1vZGVsVmFsdWVzIHtcbiAgdmFsdWU6IG51bWJlcjtcbiAgaGlnaFZhbHVlOiBudW1iZXI7XG5cbiAgcHVibGljIHN0YXRpYyBjb21wYXJlKHg/OiBNb2RlbFZhbHVlcywgeT86IE1vZGVsVmFsdWVzKTogYm9vbGVhbiB7XG4gICAgaWYgKFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHgpICYmIFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh4KSAhPT0gVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQoeSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHgudmFsdWUgPT09IHkudmFsdWUgJiYgeC5oaWdoVmFsdWUgPT09IHkuaGlnaFZhbHVlO1xuICB9XG59XG5cbmNsYXNzIE1vZGVsQ2hhbmdlIGV4dGVuZHMgTW9kZWxWYWx1ZXMge1xuICAvLyBGbGFnIHVzZWQgdG8gYnktcGFzcyBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpIGZpbHRlciBvbiBpbnB1dCB2YWx1ZXNcbiAgLy8gKHNvbWV0aW1lcyB0aGVyZSBpcyBhIG5lZWQgdG8gcGFzcyB2YWx1ZXMgdGhyb3VnaCBldmVuIHRob3VnaCB0aGUgbW9kZWwgdmFsdWVzIGhhdmUgbm90IGNoYW5nZWQpXG4gIGZvcmNlQ2hhbmdlOiBib29sZWFuO1xuXG4gIHB1YmxpYyBzdGF0aWMgY29tcGFyZSh4PzogTW9kZWxDaGFuZ2UsIHk/OiBNb2RlbENoYW5nZSk6IGJvb2xlYW4ge1xuICAgIGlmIChWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh4KSAmJiBWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQoeCkgIT09IFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB4LnZhbHVlID09PSB5LnZhbHVlICYmXG4gICAgICAgICAgIHguaGlnaFZhbHVlID09PSB5LmhpZ2hWYWx1ZSAmJlxuICAgICAgICAgICB4LmZvcmNlQ2hhbmdlID09PSB5LmZvcmNlQ2hhbmdlO1xuICB9XG59XG5cbmNsYXNzIElucHV0TW9kZWxDaGFuZ2UgZXh0ZW5kcyBNb2RlbENoYW5nZSB7XG4gIGludGVybmFsQ2hhbmdlOiBib29sZWFuO1xufVxuXG5jbGFzcyBPdXRwdXRNb2RlbENoYW5nZSBleHRlbmRzIE1vZGVsQ2hhbmdlIHtcbiAgdXNlckV2ZW50SW5pdGlhdGVkOiBib29sZWFuO1xufVxuXG5jb25zdCBOR1hfU0xJREVSX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdXNlLWJlZm9yZS1kZWNsYXJlICovXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNsaWRlckNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtc2xpZGVyJyxcbiAgdGVtcGxhdGU6IGA8IS0tIC8vIDAgTGVmdCBzZWxlY3Rpb24gYmFyIG91dHNpZGUgdHdvIGhhbmRsZXMgLS0+XG48c3BhbiBuZ3hTbGlkZXJFbGVtZW50ICNsZWZ0T3V0ZXJTZWxlY3Rpb25CYXIgY2xhc3M9XCJuZ3gtc2xpZGVyLXNwYW4gbmd4LXNsaWRlci1iYXItd3JhcHBlciBuZ3gtc2xpZGVyLWxlZnQtb3V0LXNlbGVjdGlvblwiPlxuICA8c3BhbiBjbGFzcz1cIm5neC1zbGlkZXItc3BhbiBuZ3gtc2xpZGVyLWJhclwiPjwvc3Bhbj5cbjwvc3Bhbj5cbjwhLS0gLy8gMSBSaWdodCBzZWxlY3Rpb24gYmFyIG91dHNpZGUgdHdvIGhhbmRsZXMgLS0+XG48c3BhbiBuZ3hTbGlkZXJFbGVtZW50ICNyaWdodE91dGVyU2VsZWN0aW9uQmFyIGNsYXNzPVwibmd4LXNsaWRlci1zcGFuIG5neC1zbGlkZXItYmFyLXdyYXBwZXIgbmd4LXNsaWRlci1yaWdodC1vdXQtc2VsZWN0aW9uXCI+XG4gIDxzcGFuIGNsYXNzPVwibmd4LXNsaWRlci1zcGFuIG5neC1zbGlkZXItYmFyXCI+PC9zcGFuPlxuPC9zcGFuPlxuPCEtLSAvLyAyIFRoZSB3aG9sZSBzbGlkZXIgYmFyIC0tPlxuPHNwYW4gbmd4U2xpZGVyRWxlbWVudCAjZnVsbEJhciBbY2xhc3Mubmd4LXNsaWRlci10cmFuc3BhcmVudF09XCJmdWxsQmFyVHJhbnNwYXJlbnRDbGFzc1wiIGNsYXNzPVwibmd4LXNsaWRlci1zcGFuIG5neC1zbGlkZXItYmFyLXdyYXBwZXIgbmd4LXNsaWRlci1mdWxsLWJhclwiPlxuICA8c3BhbiBjbGFzcz1cIm5neC1zbGlkZXItc3BhbiBuZ3gtc2xpZGVyLWJhclwiPjwvc3Bhbj5cbjwvc3Bhbj5cbjwhLS0gLy8gMyBTZWxlY3Rpb24gYmFyIGJldHdlZW4gdHdvIGhhbmRsZXMgLS0+XG48c3BhbiBuZ3hTbGlkZXJFbGVtZW50ICNzZWxlY3Rpb25CYXIgW2NsYXNzLm5neC1zbGlkZXItZHJhZ2dhYmxlXT1cInNlbGVjdGlvbkJhckRyYWdnYWJsZUNsYXNzXCIgY2xhc3M9XCJuZ3gtc2xpZGVyLXNwYW4gbmd4LXNsaWRlci1iYXItd3JhcHBlciBuZ3gtc2xpZGVyLXNlbGVjdGlvbi1iYXJcIj5cbiAgPHNwYW4gY2xhc3M9XCJuZ3gtc2xpZGVyLXNwYW4gbmd4LXNsaWRlci1iYXIgbmd4LXNsaWRlci1zZWxlY3Rpb25cIiBbbmdTdHlsZV09XCJiYXJTdHlsZVwiPjwvc3Bhbj5cbjwvc3Bhbj5cbjwhLS0gLy8gNCBMb3cgc2xpZGVyIGhhbmRsZSAtLT5cbjxzcGFuIG5neFNsaWRlckhhbmRsZSAjbWluSGFuZGxlIGNsYXNzPVwibmd4LXNsaWRlci1zcGFuIG5neC1zbGlkZXItcG9pbnRlciBuZ3gtc2xpZGVyLXBvaW50ZXItbWluXCIgW25nU3R5bGVdPW1pblBvaW50ZXJTdHlsZT48L3NwYW4+XG48IS0tIC8vIDUgSGlnaCBzbGlkZXIgaGFuZGxlIC0tPlxuPHNwYW4gbmd4U2xpZGVySGFuZGxlICNtYXhIYW5kbGUgW3N0eWxlLmRpc3BsYXldPVwicmFuZ2UgPyAnaW5oZXJpdCcgOiAnbm9uZSdcIiBjbGFzcz1cIm5neC1zbGlkZXItc3BhbiBuZ3gtc2xpZGVyLXBvaW50ZXIgbmd4LXNsaWRlci1wb2ludGVyLW1heFwiIFtuZ1N0eWxlXT1tYXhQb2ludGVyU3R5bGU+PC9zcGFuPlxuPCEtLSAvLyA2IEZsb29yIGxhYmVsIC0tPlxuPHNwYW4gbmd4U2xpZGVyTGFiZWwgI2Zsb29yTGFiZWwgY2xhc3M9XCJuZ3gtc2xpZGVyLXNwYW4gbmd4LXNsaWRlci1idWJibGUgbmd4LXNsaWRlci1saW1pdCBuZ3gtc2xpZGVyLWZsb29yXCI+PC9zcGFuPlxuPCEtLSAvLyA3IENlaWxpbmcgbGFiZWwgLS0+XG48c3BhbiBuZ3hTbGlkZXJMYWJlbCAjY2VpbExhYmVsIGNsYXNzPVwibmd4LXNsaWRlci1zcGFuIG5neC1zbGlkZXItYnViYmxlIG5neC1zbGlkZXItbGltaXQgbmd4LXNsaWRlci1jZWlsXCI+PC9zcGFuPlxuPCEtLSAvLyA4IExhYmVsIGFib3ZlIHRoZSBsb3cgc2xpZGVyIGhhbmRsZSAtLT5cbjxzcGFuIG5neFNsaWRlckxhYmVsICNtaW5IYW5kbGVMYWJlbCBjbGFzcz1cIm5neC1zbGlkZXItc3BhbiBuZ3gtc2xpZGVyLWJ1YmJsZSBuZ3gtc2xpZGVyLW1vZGVsLXZhbHVlXCI+PC9zcGFuPlxuPCEtLSAvLyA5IExhYmVsIGFib3ZlIHRoZSBoaWdoIHNsaWRlciBoYW5kbGUgLS0+XG48c3BhbiBuZ3hTbGlkZXJMYWJlbCAjbWF4SGFuZGxlTGFiZWwgY2xhc3M9XCJuZ3gtc2xpZGVyLXNwYW4gbmd4LXNsaWRlci1idWJibGUgbmd4LXNsaWRlci1tb2RlbC1oaWdoXCI+PC9zcGFuPlxuPCEtLSAvLyAxMCBDb21iaW5lZCByYW5nZSBsYWJlbCB3aGVuIHRoZSBzbGlkZXIgaGFuZGxlcyBhcmUgY2xvc2UgZXguIDE1IC0gMTcgLS0+XG48c3BhbiBuZ3hTbGlkZXJMYWJlbCAjY29tYmluZWRMYWJlbCBjbGFzcz1cIm5neC1zbGlkZXItc3BhbiBuZ3gtc2xpZGVyLWJ1YmJsZSBuZ3gtc2xpZGVyLWNvbWJpbmVkXCI+PC9zcGFuPlxuPCEtLSAvLyAxMSBUaGUgdGlja3MgLS0+XG48c3BhbiBuZ3hTbGlkZXJFbGVtZW50ICN0aWNrc0VsZW1lbnQgW2hpZGRlbl09XCIhc2hvd1RpY2tzXCIgW2NsYXNzLm5neC1zbGlkZXItdGlja3MtdmFsdWVzLXVuZGVyXT1cInRpY2tzVW5kZXJWYWx1ZXNDbGFzc1wiIGNsYXNzPVwibmd4LXNsaWRlci10aWNrc1wiPlxuICA8c3BhbiAqbmdGb3I9XCJsZXQgdCBvZiB0aWNrc1wiIGNsYXNzPVwibmd4LXNsaWRlci10aWNrXCIgW25nQ2xhc3NdPVwieyduZ3gtc2xpZGVyLXNlbGVjdGVkJzogdC5zZWxlY3RlZH1cIiBbbmdTdHlsZV09XCJ0LnN0eWxlXCI+XG4gICAgPG5neC1zbGlkZXItdG9vbHRpcC13cmFwcGVyIFt0ZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIiBbdG9vbHRpcF09XCJ0LnRvb2x0aXBcIiBbcGxhY2VtZW50XT1cInQudG9vbHRpcFBsYWNlbWVudFwiPjwvbmd4LXNsaWRlci10b29sdGlwLXdyYXBwZXI+XG4gICAgPG5neC1zbGlkZXItdG9vbHRpcC13cmFwcGVyICpuZ0lmPVwidC52YWx1ZSAhPSBudWxsXCIgY2xhc3M9XCJuZ3gtc2xpZGVyLXNwYW4gbmd4LXNsaWRlci10aWNrLXZhbHVlXCJcbiAgICAgICAgW3RlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiIFt0b29sdGlwXT1cInQudmFsdWVUb29sdGlwXCIgW3BsYWNlbWVudF09XCJ0LnZhbHVlVG9vbHRpcFBsYWNlbWVudFwiIFtjb250ZW50XT1cInQudmFsdWVcIj48L25neC1zbGlkZXItdG9vbHRpcC13cmFwcGVyPlxuICAgIDxzcGFuICpuZ0lmPVwidC5sZWdlbmQgIT0gbnVsbFwiIGNsYXNzPVwibmd4LXNsaWRlci1zcGFuIG5neC1zbGlkZXItdGljay1sZWdlbmRcIiBbaW5uZXJIVE1MXT1cInQubGVnZW5kXCI+PC9zcGFuPlxuICA8L3NwYW4+XG48L3NwYW4+YCxcbiAgc3R5bGVzOiBbYDo6bmctZGVlcCAubmd4LXNsaWRlcntkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTtoZWlnaHQ6NHB4O3dpZHRoOjEwMCU7bWFyZ2luOjM1cHggMCAxNXB4O3ZlcnRpY2FsLWFsaWduOm1pZGRsZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7dG91Y2gtYWN0aW9uOnBhbi15fTo6bmctZGVlcCAubmd4LXNsaWRlci53aXRoLWxlZ2VuZHttYXJnaW4tYm90dG9tOjQwcHh9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyW2Rpc2FibGVkXXtjdXJzb3I6bm90LWFsbG93ZWR9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyW2Rpc2FibGVkXSAubmd4LXNsaWRlci1wb2ludGVye2N1cnNvcjpub3QtYWxsb3dlZDtiYWNrZ3JvdW5kLWNvbG9yOiNkOGUwZjN9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyW2Rpc2FibGVkXSAubmd4LXNsaWRlci1kcmFnZ2FibGV7Y3Vyc29yOm5vdC1hbGxvd2VkfTo6bmctZGVlcCAubmd4LXNsaWRlcltkaXNhYmxlZF0gLm5neC1zbGlkZXItc2VsZWN0aW9ue2JhY2tncm91bmQ6IzhiOTFhMn06Om5nLWRlZXAgLm5neC1zbGlkZXJbZGlzYWJsZWRdIC5uZ3gtc2xpZGVyLXRpY2t7Y3Vyc29yOm5vdC1hbGxvd2VkfTo6bmctZGVlcCAubmd4LXNsaWRlcltkaXNhYmxlZF0gLm5neC1zbGlkZXItdGljay5uZ3gtc2xpZGVyLXNlbGVjdGVke2JhY2tncm91bmQ6IzhiOTFhMn06Om5nLWRlZXAgLm5neC1zbGlkZXIgLm5neC1zbGlkZXItc3Bhbnt3aGl0ZS1zcGFjZTpub3dyYXA7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTppbmxpbmUtYmxvY2t9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLWJhc2V7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtwYWRkaW5nOjB9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLWJhci13cmFwcGVye2xlZnQ6MDtib3gtc2l6aW5nOmJvcmRlci1ib3g7bWFyZ2luLXRvcDotMTZweDtwYWRkaW5nLXRvcDoxNnB4O3dpZHRoOjEwMCU7aGVpZ2h0OjMycHg7ei1pbmRleDoxfTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci1kcmFnZ2FibGV7Y3Vyc29yOm1vdmV9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLWJhcntsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6NHB4O3otaW5kZXg6MTtiYWNrZ3JvdW5kOiNkOGUwZjM7Ym9yZGVyLXJhZGl1czoycHh9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLWJhci13cmFwcGVyLm5neC1zbGlkZXItdHJhbnNwYXJlbnQgLm5neC1zbGlkZXItYmFye2JhY2tncm91bmQ6MCAwfTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci1iYXItd3JhcHBlci5uZ3gtc2xpZGVyLWxlZnQtb3V0LXNlbGVjdGlvbiAubmd4LXNsaWRlci1iYXJ7YmFja2dyb3VuZDojZGYwMDJkfTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci1iYXItd3JhcHBlci5uZ3gtc2xpZGVyLXJpZ2h0LW91dC1zZWxlY3Rpb24gLm5neC1zbGlkZXItYmFye2JhY2tncm91bmQ6IzAzYTY4OH06Om5nLWRlZXAgLm5neC1zbGlkZXIgLm5neC1zbGlkZXItc2VsZWN0aW9ue3otaW5kZXg6MjtiYWNrZ3JvdW5kOiMwZGI5ZjA7Ym9yZGVyLXJhZGl1czoycHh9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLXBvaW50ZXJ7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6MzJweDtoZWlnaHQ6MzJweDt0b3A6LTE0cHg7YmFja2dyb3VuZC1jb2xvcjojMGRiOWYwO3otaW5kZXg6Mztib3JkZXItcmFkaXVzOjE2cHh9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLXBvaW50ZXI6YWZ0ZXJ7Y29udGVudDonJzt3aWR0aDo4cHg7aGVpZ2h0OjhweDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTJweDtsZWZ0OjEycHg7Ym9yZGVyLXJhZGl1czo0cHg7YmFja2dyb3VuZDojZmZmfTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci1wb2ludGVyOmhvdmVyOmFmdGVye2JhY2tncm91bmQtY29sb3I6I2ZmZn06Om5nLWRlZXAgLm5neC1zbGlkZXIgLm5neC1zbGlkZXItcG9pbnRlci5uZ3gtc2xpZGVyLWFjdGl2ZXt6LWluZGV4OjR9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLXBvaW50ZXIubmd4LXNsaWRlci1hY3RpdmU6YWZ0ZXJ7YmFja2dyb3VuZC1jb2xvcjojNDUxYWZmfTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci1idWJibGV7Y3Vyc29yOmRlZmF1bHQ7Ym90dG9tOjE2cHg7cGFkZGluZzoxcHggM3B4O2NvbG9yOiM1NTYzN2Q7Zm9udC1zaXplOjE2cHh9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLWJ1YmJsZS5uZ3gtc2xpZGVyLWxpbWl0e2NvbG9yOiM1NTYzN2R9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLXRpY2tze2JveC1zaXppbmc6Ym9yZGVyLWJveDt3aWR0aDoxMDAlO2hlaWdodDowO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6LTNweDttYXJnaW46MDt6LWluZGV4OjE7bGlzdC1zdHlsZTpub25lfTo6bmctZGVlcCAubmd4LXNsaWRlciAubmd4LXNsaWRlci10aWNrcy12YWx1ZXMtdW5kZXIgLm5neC1zbGlkZXItdGljay12YWx1ZXt0b3A6YXV0bztib3R0b206LTM2cHh9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLXRpY2t7dGV4dC1hbGlnbjpjZW50ZXI7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6MTBweDtoZWlnaHQ6MTBweDtiYWNrZ3JvdW5kOiNkOGUwZjM7Ym9yZGVyLXJhZGl1czo1MCU7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO21hcmdpbi1sZWZ0OjExcHh9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLXRpY2submd4LXNsaWRlci1zZWxlY3RlZHtiYWNrZ3JvdW5kOiMwZGI5ZjB9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyIC5uZ3gtc2xpZGVyLXRpY2stdmFsdWV7cG9zaXRpb246YWJzb2x1dGU7dG9wOi0zNHB4Oy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwwKX06Om5nLWRlZXAgLm5neC1zbGlkZXIgLm5neC1zbGlkZXItdGljay1sZWdlbmR7cG9zaXRpb246YWJzb2x1dGU7dG9wOjI0cHg7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLDApO21heC13aWR0aDo1MHB4O3doaXRlLXNwYWNlOm5vcm1hbH06Om5nLWRlZXAgLm5neC1zbGlkZXIudmVydGljYWx7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6NHB4O2hlaWdodDoxMDAlO21hcmdpbjowIDIwcHg7cGFkZGluZzowO3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lO3RvdWNoLWFjdGlvbjpwYW4teH06Om5nLWRlZXAgLm5neC1zbGlkZXIudmVydGljYWwgLm5neC1zbGlkZXItYmFzZXt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3BhZGRpbmc6MH06Om5nLWRlZXAgLm5neC1zbGlkZXIudmVydGljYWwgLm5neC1zbGlkZXItYmFyLXdyYXBwZXJ7dG9wOmF1dG87bGVmdDowO21hcmdpbjowIDAgMCAtMTZweDtwYWRkaW5nOjAgMCAwIDE2cHg7aGVpZ2h0OjEwMCU7d2lkdGg6MzJweH06Om5nLWRlZXAgLm5neC1zbGlkZXIudmVydGljYWwgLm5neC1zbGlkZXItYmFye2JvdHRvbTowO2xlZnQ6YXV0bzt3aWR0aDo0cHg7aGVpZ2h0OjEwMCV9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyLnZlcnRpY2FsIC5uZ3gtc2xpZGVyLXBvaW50ZXJ7bGVmdDotMTRweCFpbXBvcnRhbnQ7dG9wOmF1dG87Ym90dG9tOjB9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyLnZlcnRpY2FsIC5uZ3gtc2xpZGVyLWJ1YmJsZXtsZWZ0OjE2cHghaW1wb3J0YW50O2JvdHRvbTowfTo6bmctZGVlcCAubmd4LXNsaWRlci52ZXJ0aWNhbCAubmd4LXNsaWRlci10aWNrc3toZWlnaHQ6MTAwJTt3aWR0aDowO2xlZnQ6LTNweDt0b3A6MDt6LWluZGV4OjF9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyLnZlcnRpY2FsIC5uZ3gtc2xpZGVyLXRpY2t7dmVydGljYWwtYWxpZ246bWlkZGxlO21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXRvcDoxMXB4fTo6bmctZGVlcCAubmd4LXNsaWRlci52ZXJ0aWNhbCAubmd4LXNsaWRlci10aWNrLXZhbHVle2xlZnQ6MjRweDt0b3A6YXV0bzstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoMCwtMjglKTt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsLTI4JSl9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyLnZlcnRpY2FsIC5uZ3gtc2xpZGVyLXRpY2stbGVnZW5ke3RvcDphdXRvO3JpZ2h0OjI0cHg7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKDAsLTI4JSk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwLC0yOCUpO21heC13aWR0aDpub25lO3doaXRlLXNwYWNlOm5vd3JhcH06Om5nLWRlZXAgLm5neC1zbGlkZXIudmVydGljYWwgLm5neC1zbGlkZXItdGlja3MtdmFsdWVzLXVuZGVyIC5uZ3gtc2xpZGVyLXRpY2stdmFsdWV7Ym90dG9tOmF1dG87bGVmdDphdXRvO3JpZ2h0OjI0cHh9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyICp7dHJhbnNpdGlvbjpub25lfTo6bmctZGVlcCAubmd4LXNsaWRlci5hbmltYXRlIC5uZ3gtc2xpZGVyLWJhci13cmFwcGVye3RyYW5zaXRpb246LjNzIGxpbmVhcn06Om5nLWRlZXAgLm5neC1zbGlkZXIuYW5pbWF0ZSAubmd4LXNsaWRlci1zZWxlY3Rpb257dHJhbnNpdGlvbjpiYWNrZ3JvdW5kLWNvbG9yIC4zcyBsaW5lYXJ9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyLmFuaW1hdGUgLm5neC1zbGlkZXItcG9pbnRlcnt0cmFuc2l0aW9uOi4zcyBsaW5lYXJ9OjpuZy1kZWVwIC5uZ3gtc2xpZGVyLmFuaW1hdGUgLm5neC1zbGlkZXItYnViYmxle3RyYW5zaXRpb246LjNzIGxpbmVhcn06Om5nLWRlZXAgLm5neC1zbGlkZXIuYW5pbWF0ZSAubmd4LXNsaWRlci1idWJibGUubmd4LXNsaWRlci1saW1pdHt0cmFuc2l0aW9uOm9wYWNpdHkgLjNzIGxpbmVhcn06Om5nLWRlZXAgLm5neC1zbGlkZXIuYW5pbWF0ZSAubmd4LXNsaWRlci1idWJibGUubmd4LXNsaWRlci1jb21iaW5lZHt0cmFuc2l0aW9uOm9wYWNpdHkgLjNzIGxpbmVhcn06Om5nLWRlZXAgLm5neC1zbGlkZXIuYW5pbWF0ZSAubmd4LXNsaWRlci10aWNre3RyYW5zaXRpb246YmFja2dyb3VuZC1jb2xvciAuM3MgbGluZWFyfWBdLFxuICBob3N0OiB7IGNsYXNzOiAnbmd4LXNsaWRlcicgfSxcbiAgcHJvdmlkZXJzOiBbTkdYX1NMSURFUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8vIE1vZGVsIGZvciBsb3cgdmFsdWUgb2Ygc2xpZGVyLiBGb3Igc2ltcGxlIHNsaWRlciwgdGhpcyBpcyB0aGUgb25seSBpbnB1dC4gRm9yIHJhbmdlIHNsaWRlciwgdGhpcyBpcyB0aGUgbG93IHZhbHVlLlxuICBASW5wdXQoKVxuICBwdWJsaWMgdmFsdWU6IG51bWJlciA9IG51bGw7XG4gIC8vIE91dHB1dCBmb3IgbG93IHZhbHVlIHNsaWRlciB0byBzdXBwb3J0IHR3by13YXkgYmluZGluZ3NcbiAgQE91dHB1dCgpXG4gIHB1YmxpYyB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLy8gTW9kZWwgZm9yIGhpZ2ggdmFsdWUgb2Ygc2xpZGVyLiBOb3QgdXNlZCBpbiBzaW1wbGUgc2xpZGVyLiBGb3IgcmFuZ2Ugc2xpZGVyLCB0aGlzIGlzIHRoZSBoaWdoIHZhbHVlLlxuICBASW5wdXQoKVxuICBwdWJsaWMgaGlnaFZhbHVlOiBudW1iZXIgPSBudWxsO1xuICAvLyBPdXRwdXQgZm9yIGhpZ2ggdmFsdWUgc2xpZGVyIHRvIHN1cHBvcnQgdHdvLXdheSBiaW5kaW5nc1xuICBAT3V0cHV0KClcbiAgcHVibGljIGhpZ2hWYWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLy8gQW4gb2JqZWN0IHdpdGggYWxsIHRoZSBvdGhlciBvcHRpb25zIG9mIHRoZSBzbGlkZXIuXG4gIC8vIEVhY2ggb3B0aW9uIGNhbiBiZSB1cGRhdGVkIGF0IHJ1bnRpbWUgYW5kIHRoZSBzbGlkZXIgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIHJlLXJlbmRlcmVkLlxuICBASW5wdXQoKVxuICBwdWJsaWMgb3B0aW9uczogT3B0aW9ucyA9IG5ldyBPcHRpb25zKCk7XG5cbiAgLy8gRXZlbnQgZW1pdHRlZCB3aGVuIHVzZXIgc3RhcnRzIGludGVyYWN0aW9uIHdpdGggdGhlIHNsaWRlclxuICBAT3V0cHV0KClcbiAgcHVibGljIHVzZXJDaGFuZ2VTdGFydDogRXZlbnRFbWl0dGVyPENoYW5nZUNvbnRleHQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8vIEV2ZW50IGVtaXR0ZWQgb24gZWFjaCBjaGFuZ2UgY29taW5nIGZyb20gdXNlciBpbnRlcmFjdGlvblxuICBAT3V0cHV0KClcbiAgcHVibGljIHVzZXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxDaGFuZ2VDb250ZXh0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvLyBFdmVudCBlbWl0dGVkIHdoZW4gdXNlciBmaW5pc2hlcyBpbnRlcmFjdGlvbiB3aXRoIHRoZSBzbGlkZXJcbiAgQE91dHB1dCgpXG4gIHB1YmxpYyB1c2VyQ2hhbmdlRW5kOiBFdmVudEVtaXR0ZXI8Q2hhbmdlQ29udGV4dD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBtYW51YWxSZWZyZXNoU3Vic2NyaXB0aW9uOiBhbnk7XG4gIC8vIElucHV0IGV2ZW50IHRoYXQgdHJpZ2dlcnMgc2xpZGVyIHJlZnJlc2ggKHJlLXBvc2l0aW9uaW5nIG9mIHNsaWRlciBlbGVtZW50cylcbiAgQElucHV0KCkgc2V0IG1hbnVhbFJlZnJlc2gobWFudWFsUmVmcmVzaDogRXZlbnRFbWl0dGVyPHZvaWQ+KSB7XG4gICAgdGhpcy51bnN1YnNjcmliZU1hbnVhbFJlZnJlc2goKTtcblxuICAgIHRoaXMubWFudWFsUmVmcmVzaFN1YnNjcmlwdGlvbiA9IG1hbnVhbFJlZnJlc2guc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jYWxjdWxhdGVWaWV3RGltZW5zaW9uc0FuZERldGVjdENoYW5nZXMoKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHRyaWdnZXJGb2N1c1N1YnNjcmlwdGlvbjogYW55O1xuICAvLyBJbnB1dCBldmVudCB0aGF0IHRyaWdnZXJzIHNldHRpbmcgZm9jdXMgb24gZ2l2ZW4gc2xpZGVyIGhhbmRsZVxuICBASW5wdXQoKSBzZXQgdHJpZ2dlckZvY3VzKHRyaWdnZXJGb2N1czogRXZlbnRFbWl0dGVyPHZvaWQ+KSB7XG4gICAgdGhpcy51bnN1YnNjcmliZVRyaWdnZXJGb2N1cygpO1xuXG4gICAgdGhpcy50cmlnZ2VyRm9jdXNTdWJzY3JpcHRpb24gPSB0cmlnZ2VyRm9jdXMuc3Vic2NyaWJlKChwb2ludGVyVHlwZTogUG9pbnRlclR5cGUpID0+IHtcbiAgICAgIHRoaXMuZm9jdXNQb2ludGVyKHBvaW50ZXJUeXBlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNsaWRlciB0eXBlLCB0cnVlIG1lYW5zIHJhbmdlIHNsaWRlclxuICBwdWJsaWMgZ2V0IHJhbmdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52YWx1ZSkgJiYgIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuaGlnaFZhbHVlKTtcbiAgfVxuXG4gIC8vIFNldCB0byB0cnVlIGlmIGluaXQgbWV0aG9kIGFscmVhZHkgZXhlY3V0ZWRcbiAgcHJpdmF0ZSBpbml0SGFzUnVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLy8gQ2hhbmdlcyBpbiBtb2RlbCBpbnB1dHMgYXJlIHBhc3NlZCB0aHJvdWdoIHRoaXMgc3ViamVjdFxuICAvLyBUaGVzZSBhcmUgYWxsIGNoYW5nZXMgY29taW5nIGluIGZyb20gb3V0c2lkZSB0aGUgY29tcG9uZW50IHRocm91Z2ggaW5wdXQgYmluZGluZ3Mgb3IgcmVhY3RpdmUgZm9ybSBpbnB1dHNcbiAgcHJpdmF0ZSBpbnB1dE1vZGVsQ2hhbmdlU3ViamVjdDogU3ViamVjdDxJbnB1dE1vZGVsQ2hhbmdlPiA9IG5ldyBTdWJqZWN0PElucHV0TW9kZWxDaGFuZ2U+KCk7XG4gIHByaXZhdGUgaW5wdXRNb2RlbENoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcblxuICAvLyBDaGFuZ2VzIHRvIG1vZGVsIG91dHB1dHMgYXJlIHBhc3NlZCB0aHJvdWdoIHRoaXMgc3ViamVjdFxuICAvLyBUaGVzZSBhcmUgYWxsIGNoYW5nZXMgdGhhdCBuZWVkIHRvIGJlIGNvbW11bmljYXRlZCB0byBvdXRwdXQgZW1pdHRlcnMgYW5kIHJlZ2lzdGVyZWQgY2FsbGJhY2tzXG4gIHByaXZhdGUgb3V0cHV0TW9kZWxDaGFuZ2VTdWJqZWN0OiBTdWJqZWN0PE91dHB1dE1vZGVsQ2hhbmdlPiA9IG5ldyBTdWJqZWN0PE91dHB1dE1vZGVsQ2hhbmdlPigpO1xuICBwcml2YXRlIG91dHB1dE1vZGVsQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBudWxsO1xuXG4gIC8vIExvdyB2YWx1ZSBzeW5jZWQgdG8gbW9kZWwgbG93IHZhbHVlXG4gIHByaXZhdGUgdmlld0xvd1ZhbHVlOiBudW1iZXIgPSBudWxsO1xuICAvLyBIaWdoIHZhbHVlIHN5bmNlZCB0byBtb2RlbCBoaWdoIHZhbHVlXG4gIHByaXZhdGUgdmlld0hpZ2hWYWx1ZTogbnVtYmVyID0gbnVsbDtcbiAgLy8gT3B0aW9ucyBzeW5jZWQgdG8gbW9kZWwgb3B0aW9ucywgYmFzZWQgb24gZGVmYXVsdHNcbiAgcHJpdmF0ZSB2aWV3T3B0aW9uczogT3B0aW9ucyA9IG5ldyBPcHRpb25zKCk7XG5cbiAgLy8gSGFsZiBvZiB0aGUgd2lkdGggb3IgaGVpZ2h0IG9mIHRoZSBzbGlkZXIgaGFuZGxlc1xuICBwcml2YXRlIGhhbmRsZUhhbGZEaW1lbnNpb246IG51bWJlciA9IDA7XG4gIC8vIE1heGltdW0gcG9zaXRpb24gdGhlIHNsaWRlciBoYW5kbGUgY2FuIGhhdmVcbiAgcHJpdmF0ZSBtYXhIYW5kbGVQb3NpdGlvbjogbnVtYmVyID0gMDtcblxuICAvLyBXaGljaCBoYW5kbGUgaXMgY3VycmVudGx5IHRyYWNrZWQgZm9yIG1vdmUgZXZlbnRzXG4gIHByaXZhdGUgY3VycmVudFRyYWNraW5nUG9pbnRlcjogUG9pbnRlclR5cGUgPSBudWxsO1xuICAvLyBJbnRlcm5hbCB2YXJpYWJsZSB0byBrZWVwIHRyYWNrIG9mIHRoZSBmb2N1cyBlbGVtZW50XG4gIHByaXZhdGUgY3VycmVudEZvY3VzUG9pbnRlcjogUG9pbnRlclR5cGUgPSBudWxsO1xuICAvLyBVc2VkIHRvIGNhbGwgb25TdGFydCBvbiB0aGUgZmlyc3Qga2V5ZG93biBldmVudFxuICBwcml2YXRlIGZpcnN0S2V5RG93bjogYm9vbGVhbiA9IGZhbHNlO1xuICAvLyBDdXJyZW50IHRvdWNoIGlkIG9mIHRvdWNoIGV2ZW50IGJlaW5nIGhhbmRsZWRcbiAgcHJpdmF0ZSB0b3VjaElkOiBudW1iZXIgPSBudWxsO1xuICAvLyBWYWx1ZXMgcmVjb3JkZWQgd2hlbiBmaXJzdCBkcmFnZ2luZyB0aGUgYmFyXG4gIHByaXZhdGUgZHJhZ2dpbmc6IERyYWdnaW5nID0gbmV3IERyYWdnaW5nKCk7XG5cbiAgLyogU2xpZGVyIERPTSBlbGVtZW50cyAqL1xuXG4gIC8vIExlZnQgc2VsZWN0aW9uIGJhciBvdXRzaWRlIHR3byBoYW5kbGVzXG4gIEBWaWV3Q2hpbGQoJ2xlZnRPdXRlclNlbGVjdGlvbkJhcicsIHtyZWFkOiBTbGlkZXJFbGVtZW50RGlyZWN0aXZlfSlcbiAgcHJpdmF0ZSBsZWZ0T3V0ZXJTZWxlY3Rpb25CYXJFbGVtZW50OiBTbGlkZXJFbGVtZW50RGlyZWN0aXZlO1xuXG4gIC8vIFJpZ2h0IHNlbGVjdGlvbiBiYXIgb3V0c2lkZSB0d28gaGFuZGxlc1xuICBAVmlld0NoaWxkKCdyaWdodE91dGVyU2VsZWN0aW9uQmFyJywge3JlYWQ6IFNsaWRlckVsZW1lbnREaXJlY3RpdmV9KVxuICBwcml2YXRlIHJpZ2h0T3V0ZXJTZWxlY3Rpb25CYXJFbGVtZW50OiBTbGlkZXJFbGVtZW50RGlyZWN0aXZlO1xuXG4gIC8vIFRoZSB3aG9sZSBzbGlkZXIgYmFyXG4gIEBWaWV3Q2hpbGQoJ2Z1bGxCYXInLCB7cmVhZDogU2xpZGVyRWxlbWVudERpcmVjdGl2ZX0pXG4gIHByaXZhdGUgZnVsbEJhckVsZW1lbnQ6IFNsaWRlckVsZW1lbnREaXJlY3RpdmU7XG5cbiAgLy8gSGlnaGxpZ2h0IGJldHdlZW4gdHdvIGhhbmRsZXNcbiAgQFZpZXdDaGlsZCgnc2VsZWN0aW9uQmFyJywge3JlYWQ6IFNsaWRlckVsZW1lbnREaXJlY3RpdmV9KVxuICBwcml2YXRlIHNlbGVjdGlvbkJhckVsZW1lbnQ6IFNsaWRlckVsZW1lbnREaXJlY3RpdmU7XG5cbiAgLy8gTGVmdCBzbGlkZXIgaGFuZGxlXG4gIEBWaWV3Q2hpbGQoJ21pbkhhbmRsZScsIHtyZWFkOiBTbGlkZXJIYW5kbGVEaXJlY3RpdmV9KVxuICBwcml2YXRlIG1pbkhhbmRsZUVsZW1lbnQ6IFNsaWRlckhhbmRsZURpcmVjdGl2ZTtcblxuICAvLyBSaWdodCBzbGlkZXIgaGFuZGxlXG4gIEBWaWV3Q2hpbGQoJ21heEhhbmRsZScsIHtyZWFkOiBTbGlkZXJIYW5kbGVEaXJlY3RpdmV9KVxuICBwcml2YXRlIG1heEhhbmRsZUVsZW1lbnQ6IFNsaWRlckhhbmRsZURpcmVjdGl2ZTtcblxuICAvLyBGbG9vciBsYWJlbFxuICBAVmlld0NoaWxkKCdmbG9vckxhYmVsJywge3JlYWQ6IFNsaWRlckxhYmVsRGlyZWN0aXZlfSlcbiAgcHJpdmF0ZSBmbG9vckxhYmVsRWxlbWVudDogU2xpZGVyTGFiZWxEaXJlY3RpdmU7XG5cbiAgLy8gQ2VpbGluZyBsYWJlbFxuICBAVmlld0NoaWxkKCdjZWlsTGFiZWwnLCB7cmVhZDogU2xpZGVyTGFiZWxEaXJlY3RpdmV9KVxuICBwcml2YXRlIGNlaWxMYWJlbEVsZW1lbnQ6IFNsaWRlckxhYmVsRGlyZWN0aXZlO1xuXG4gIC8vIExhYmVsIGFib3ZlIHRoZSBsb3cgdmFsdWVcbiAgQFZpZXdDaGlsZCgnbWluSGFuZGxlTGFiZWwnLCB7cmVhZDogU2xpZGVyTGFiZWxEaXJlY3RpdmV9KVxuICBwcml2YXRlIG1pbkhhbmRsZUxhYmVsRWxlbWVudDogU2xpZGVyTGFiZWxEaXJlY3RpdmU7XG5cbiAgLy8gTGFiZWwgYWJvdmUgdGhlIGhpZ2ggdmFsdWVcbiAgQFZpZXdDaGlsZCgnbWF4SGFuZGxlTGFiZWwnLCB7cmVhZDogU2xpZGVyTGFiZWxEaXJlY3RpdmV9KVxuICBwcml2YXRlIG1heEhhbmRsZUxhYmVsRWxlbWVudDogU2xpZGVyTGFiZWxEaXJlY3RpdmU7XG5cbiAgLy8gQ29tYmluZWQgbGFiZWxcbiAgQFZpZXdDaGlsZCgnY29tYmluZWRMYWJlbCcsIHtyZWFkOiBTbGlkZXJMYWJlbERpcmVjdGl2ZX0pXG4gIHByaXZhdGUgY29tYmluZWRMYWJlbEVsZW1lbnQ6IFNsaWRlckxhYmVsRGlyZWN0aXZlO1xuXG4gIC8vIFRoZSB0aWNrc1xuICBAVmlld0NoaWxkKCd0aWNrc0VsZW1lbnQnLCB7cmVhZDogU2xpZGVyRWxlbWVudERpcmVjdGl2ZX0pXG4gIHByaXZhdGUgdGlja3NFbGVtZW50OiBTbGlkZXJFbGVtZW50RGlyZWN0aXZlO1xuXG4gIC8vIE9wdGlvbmFsIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgZGlzcGxheWluZyB0b29sdGlwc1xuICBAQ29udGVudENoaWxkKCd0b29sdGlwVGVtcGxhdGUnKVxuICBwdWJsaWMgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8vIEhvc3QgZWxlbWVudCBjbGFzcyBiaW5kaW5nc1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnZlcnRpY2FsJylcbiAgcHVibGljIHNsaWRlckVsZW1lbnRWZXJ0aWNhbENsYXNzOiBib29sZWFuID0gZmFsc2U7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuYW5pbWF0ZScpXG4gIHB1YmxpYyBzbGlkZXJFbGVtZW50QW5pbWF0ZUNsYXNzOiBib29sZWFuID0gZmFsc2U7XG4gIEBIb3N0QmluZGluZygnY2xhc3Mud2l0aC1sZWdlbmQnKVxuICBwdWJsaWMgc2xpZGVyRWxlbWVudFdpdGhMZWdlbmRDbGFzczogYm9vbGVhbiA9IGZhbHNlO1xuICBASG9zdEJpbmRpbmcoJ2F0dHIuZGlzYWJsZWQnKVxuICBwdWJsaWMgc2xpZGVyRWxlbWVudERpc2FibGVkQXR0cjogc3RyaW5nID0gbnVsbDtcblxuICAvLyBDU1Mgc3R5bGVzIGFuZCBjbGFzcyBmbGFnc1xuICBwdWJsaWMgYmFyU3R5bGU6IGFueSA9IHt9O1xuICBwdWJsaWMgbWluUG9pbnRlclN0eWxlOiBhbnkgPSB7fTtcbiAgcHVibGljIG1heFBvaW50ZXJTdHlsZTogYW55ID0ge307XG4gIHB1YmxpYyBmdWxsQmFyVHJhbnNwYXJlbnRDbGFzczogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgc2VsZWN0aW9uQmFyRHJhZ2dhYmxlQ2xhc3M6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHRpY2tzVW5kZXJWYWx1ZXNDbGFzczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vIFdoZXRoZXIgdG8gc2hvdy9oaWRlIHRpY2tzXG4gIHB1YmxpYyBnZXQgc2hvd1RpY2tzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnZpZXdPcHRpb25zLnNob3dUaWNrcztcbiAgfVxuXG4gIC8qIElmIHRpY2tTdGVwIGlzIHNldCBvciB0aWNrc0FycmF5IGlzIHNwZWNpZmllZC5cbiAgICAgSW4gdGhpcyBjYXNlLCB0aWNrcyB2YWx1ZXMgc2hvdWxkIGJlIGRpc3BsYXllZCBiZWxvdyB0aGUgc2xpZGVyLiAqL1xuICBwcml2YXRlIGludGVybWVkaWF0ZVRpY2tzOiBib29sZWFuID0gZmFsc2U7XG4gIC8vIFRpY2tzIGFycmF5IGFzIGRpc3BsYXllZCBpbiB2aWV3XG4gIHB1YmxpYyB0aWNrczogVGlja1tdID0gW107XG5cbiAgLy8gRXZlbnQgbGlzdGVuZXJzXG4gIHByaXZhdGUgZXZlbnRMaXN0ZW5lckhlbHBlcjogRXZlbnRMaXN0ZW5lckhlbHBlciA9IG51bGw7XG4gIHByaXZhdGUgb25Nb3ZlRXZlbnRMaXN0ZW5lcjogRXZlbnRMaXN0ZW5lciA9IG51bGw7XG4gIHByaXZhdGUgb25FbmRFdmVudExpc3RlbmVyOiBFdmVudExpc3RlbmVyID0gbnVsbDtcbiAgLy8gV2hldGhlciBjdXJyZW50bHkgbW92aW5nIHRoZSBzbGlkZXIgKGJldHdlZW4gb25TdGFydCgpIGFuZCBvbkVuZCgpKVxuICBwcml2YXRlIG1vdmluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8vIE9ic2VydmVyIGZvciBzbGlkZXIgZWxlbWVudCByZXNpemUgZXZlbnRzXG4gIHByaXZhdGUgcmVzaXplT2JzZXJ2ZXI6IFJlc2l6ZU9ic2VydmVyID0gbnVsbDtcblxuICAvLyBDYWxsYmFja3MgZm9yIHJlYWN0aXZlIGZvcm1zIHN1cHBvcnRcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSBudWxsO1xuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gbnVsbDtcblxuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMuZXZlbnRMaXN0ZW5lckhlbHBlciA9IG5ldyBFdmVudExpc3RlbmVySGVscGVyKHRoaXMucmVuZGVyZXIpO1xuICB9XG5cbiAgLy8gT25Jbml0IGludGVyZmFjZVxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3T3B0aW9ucyA9IG5ldyBPcHRpb25zKCk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLnZpZXdPcHRpb25zLCB0aGlzLm9wdGlvbnMpO1xuXG4gICAgLy8gV2UgbmVlZCB0byBydW4gdGhlc2UgdHdvIHRoaW5ncyBmaXJzdCwgYmVmb3JlIHRoZSByZXN0IG9mIHRoZSBpbml0IGluIG5nQWZ0ZXJWaWV3SW5pdCgpLFxuICAgIC8vIGJlY2F1c2UgdGhlc2UgdHdvIHNldHRpbmdzIGFyZSBzZXQgdGhyb3VnaCBASG9zdEJpbmRpbmcgYW5kIEFuZ3VsYXIgY2hhbmdlIGRldGVjdGlvblxuICAgIC8vIG1lY2hhbmlzbSBkb2Vzbid0IGxpa2UgdGhlbSBjaGFuZ2luZyBpbiBuZ0FmdGVyVmlld0luaXQoKVxuICAgIHRoaXMudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xuICAgIHRoaXMudXBkYXRlVmVydGljYWxTdGF0ZSgpO1xuICB9XG5cbiAgLy8gQWZ0ZXJWaWV3SW5pdCBpbnRlcmZhY2VcbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmFwcGx5T3B0aW9ucygpO1xuXG4gICAgdGhpcy5zdWJzY3JpYmVJbnB1dE1vZGVsQ2hhbmdlU3ViamVjdCh0aGlzLnZpZXdPcHRpb25zLmlucHV0RXZlbnRzSW50ZXJ2YWwpO1xuICAgIHRoaXMuc3Vic2NyaWJlT3V0cHV0TW9kZWxDaGFuZ2VTdWJqZWN0KHRoaXMudmlld09wdGlvbnMub3V0cHV0RXZlbnRzSW50ZXJ2YWwpO1xuXG4gICAgLy8gT25jZSB3ZSBhcHBseSBvcHRpb25zLCB3ZSBuZWVkIHRvIG5vcm1hbGlzZSBtb2RlbCB2YWx1ZXMgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgdGhpcy5yZW5vcm1hbGlzZU1vZGVsVmFsdWVzKCk7XG5cbiAgICB0aGlzLnZpZXdMb3dWYWx1ZSA9IHRoaXMubW9kZWxWYWx1ZVRvVmlld1ZhbHVlKHRoaXMudmFsdWUpO1xuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICB0aGlzLnZpZXdIaWdoVmFsdWUgPSB0aGlzLm1vZGVsVmFsdWVUb1ZpZXdWYWx1ZSh0aGlzLmhpZ2hWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlld0hpZ2hWYWx1ZSA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVWZXJ0aWNhbFN0YXRlKCk7IC8vIG5lZWQgdG8gcnVuIHRoaXMgYWdhaW4gdG8gY292ZXIgY2hhbmdlcyB0byBzbGlkZXIgZWxlbWVudHNcbiAgICB0aGlzLm1hbmFnZUVsZW1lbnRzU3R5bGUoKTtcbiAgICB0aGlzLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcbiAgICB0aGlzLmNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zKCk7XG4gICAgdGhpcy5hZGRBY2Nlc3NpYmlsaXR5KCk7XG4gICAgdGhpcy51cGRhdGVDZWlsTGFiZWwoKTtcbiAgICB0aGlzLnVwZGF0ZUZsb29yTGFiZWwoKTtcbiAgICB0aGlzLmluaXRIYW5kbGVzKCk7XG4gICAgdGhpcy5tYW5hZ2VFdmVudHNCaW5kaW5ncygpO1xuXG4gICAgdGhpcy5zdWJzY3JpYmVSZXNpemVPYnNlcnZlcigpO1xuXG4gICAgdGhpcy5pbml0SGFzUnVuID0gdHJ1ZTtcblxuICAgIC8vIFJ1biBjaGFuZ2UgZGV0ZWN0aW9uIG1hbnVhbGx5IHRvIHJlc29sdmUgc29tZSBpc3N1ZXMgd2hlbiBpbml0IHByb2NlZHVyZSBjaGFuZ2VzIHZhbHVlcyB1c2VkIGluIHRoZSB2aWV3XG4gICAgaWYgKCF0aGlzLmlzUmVmRGVzdHJveWVkKCkpIHtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICAvLyBPbkNoYW5nZXMgaW50ZXJmYWNlXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgLy8gQWx3YXlzIGFwcGx5IG9wdGlvbnMgZmlyc3RcbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKGNoYW5nZXMub3B0aW9ucykpIHtcbiAgICAgIHRoaXMub25DaGFuZ2VPcHRpb25zKCk7XG4gICAgfVxuXG4gICAgLy8gVGhlbiB2YWx1ZSBjaGFuZ2VzXG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChjaGFuZ2VzLnZhbHVlKSB8fFxuICAgICAgICAhVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQoY2hhbmdlcy5oaWdoVmFsdWUpKSB7XG4gICAgICB0aGlzLmlucHV0TW9kZWxDaGFuZ2VTdWJqZWN0Lm5leHQoe1xuICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgaGlnaFZhbHVlOiB0aGlzLmhpZ2hWYWx1ZSxcbiAgICAgICAgZm9yY2VDaGFuZ2U6IGZhbHNlLFxuICAgICAgICBpbnRlcm5hbENoYW5nZTogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIE9uRGVzdHJveSBpbnRlcmZhY2VcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudW5iaW5kRXZlbnRzKCk7XG5cbiAgICB0aGlzLnVuc3Vic2NyaWJlUmVzaXplT2JzZXJ2ZXIoKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlSW5wdXRNb2RlbENoYW5nZVN1YmplY3QoKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlT3V0cHV0TW9kZWxDaGFuZ2VTdWJqZWN0KCk7XG4gICAgdGhpcy51bnN1YnNjcmliZU1hbnVhbFJlZnJlc2goKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlVHJpZ2dlckZvY3VzKCk7XG4gIH1cblxuICAvLyBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcHVibGljIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBvYmpbMF07XG4gICAgICB0aGlzLmhpZ2hWYWx1ZSA9IG9ialsxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWx1ZSA9IG9iajtcbiAgICB9XG5cbiAgICAvLyBuZ09uQ2hhbmdlcygpIGlzIG5vdCBjYWxsZWQgaW4gdGhpcyBpbnN0YW5jZSwgc28gd2UgbmVlZCB0byBjb21tdW5pY2F0ZSB0aGUgY2hhbmdlIG1hbnVhbGx5XG4gICAgdGhpcy5pbnB1dE1vZGVsQ2hhbmdlU3ViamVjdC5uZXh0KHtcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgaGlnaFZhbHVlOiB0aGlzLmhpZ2hWYWx1ZSxcbiAgICAgIGZvcmNlQ2hhbmdlOiBmYWxzZSxcbiAgICAgIGludGVybmFsQ2hhbmdlOiBmYWxzZVxuICAgIH0pO1xuICB9XG5cbiAgLy8gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKG9uQ2hhbmdlQ2FsbGJhY2s6IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IG9uQ2hhbmdlQ2FsbGJhY2s7XG4gIH1cblxuICAvLyBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKG9uVG91Y2hlZENhbGxiYWNrOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gb25Ub3VjaGVkQ2FsbGJhY2s7XG4gIH1cblxuICAvLyBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcHVibGljIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMudmlld09wdGlvbnMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvblJlc2l6ZShldmVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5jYWxjdWxhdGVWaWV3RGltZW5zaW9uc0FuZERldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlSW5wdXRNb2RlbENoYW5nZVN1YmplY3QoaW50ZXJ2YWw/OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0TW9kZWxDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmlucHV0TW9kZWxDaGFuZ2VTdWJqZWN0XG4gICAgLnBpcGUoXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZChNb2RlbENoYW5nZS5jb21wYXJlKSxcbiAgICAgIC8vIEhhY2sgdG8gcmVzZXQgdGhlIHN0YXR1cyBvZiB0aGUgZGlzdGluY3RVbnRpbENoYW5nZWQoKSAtIGlmIGEgXCJmYWtlXCIgZXZlbnQgY29tZXMgdGhyb3VnaCB3aXRoIGZvcmNlQ2hhbmdlPXRydWUsXG4gICAgICAvLyB3ZSBmb3JjZWZ1bGx5IGJ5LXBhc3MgZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgYnV0IG90aGVyd2lzZSBkcm9wIHRoZSBldmVudFxuICAgICAgZmlsdGVyKChtb2RlbENoYW5nZTogSW5wdXRNb2RlbENoYW5nZSkgPT4gIW1vZGVsQ2hhbmdlLmZvcmNlQ2hhbmdlICYmICFtb2RlbENoYW5nZS5pbnRlcm5hbENoYW5nZSksXG4gICAgICAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKGludGVydmFsKSlcbiAgICAgICAgICA/IHRocm90dGxlVGltZShpbnRlcnZhbCwgdW5kZWZpbmVkLCB7IGxlYWRpbmc6IHRydWUsIHRyYWlsaW5nOiB0cnVlfSlcbiAgICAgICAgICA6IHRhcCgoKSA9PiB7fSkgLy8gbm8tb3BcbiAgICApXG4gICAgLnN1YnNjcmliZSgobW9kZWxDaGFuZ2U6IElucHV0TW9kZWxDaGFuZ2UpID0+IHRoaXMuYXBwbHlJbnB1dE1vZGVsQ2hhbmdlKG1vZGVsQ2hhbmdlKSk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZU91dHB1dE1vZGVsQ2hhbmdlU3ViamVjdChpbnRlcnZhbD86IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMub3V0cHV0TW9kZWxDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLm91dHB1dE1vZGVsQ2hhbmdlU3ViamVjdFxuICAgICAgLnBpcGUoXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKE1vZGVsQ2hhbmdlLmNvbXBhcmUpLFxuICAgICAgICAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKGludGVydmFsKSlcbiAgICAgICAgICA/IHRocm90dGxlVGltZShpbnRlcnZhbCwgdW5kZWZpbmVkLCB7IGxlYWRpbmc6IHRydWUsIHRyYWlsaW5nOiB0cnVlfSlcbiAgICAgICAgICA6IHRhcCgoKSA9PiB7fSkgLy8gbm8tb3BcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKG1vZGVsQ2hhbmdlOiBPdXRwdXRNb2RlbENoYW5nZSkgPT4gdGhpcy5wdWJsaXNoT3V0cHV0TW9kZWxDaGFuZ2UobW9kZWxDaGFuZ2UpKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlUmVzaXplT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgaWYgKENvbXBhdGliaWxpdHlIZWxwZXIuaXNSZXNpemVPYnNlcnZlckF2YWlsYWJsZSgpKSB7XG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpOiB2b2lkID0+IHRoaXMuY2FsY3VsYXRlVmlld0RpbWVuc2lvbnNBbmREZXRlY3RDaGFuZ2VzKCkpO1xuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlUmVzaXplT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgaWYgKENvbXBhdGliaWxpdHlIZWxwZXIuaXNSZXNpemVPYnNlcnZlckF2YWlsYWJsZSgpICYmIHRoaXMucmVzaXplT2JzZXJ2ZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZU9uTW92ZSgpOiB2b2lkIHtcbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMub25Nb3ZlRXZlbnRMaXN0ZW5lcikpIHtcbiAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lckhlbHBlci5kZXRhY2hFdmVudExpc3RlbmVyKHRoaXMub25Nb3ZlRXZlbnRMaXN0ZW5lcik7XG4gICAgICB0aGlzLm9uTW92ZUV2ZW50TGlzdGVuZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVPbkVuZCgpOiB2b2lkIHtcbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMub25FbmRFdmVudExpc3RlbmVyKSkge1xuICAgICAgdGhpcy5ldmVudExpc3RlbmVySGVscGVyLmRldGFjaEV2ZW50TGlzdGVuZXIodGhpcy5vbkVuZEV2ZW50TGlzdGVuZXIpO1xuICAgICAgdGhpcy5vbkVuZEV2ZW50TGlzdGVuZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVJbnB1dE1vZGVsQ2hhbmdlU3ViamVjdCgpOiB2b2lkIHtcbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuaW5wdXRNb2RlbENoYW5nZVN1YnNjcmlwdGlvbikpIHtcbiAgICAgIHRoaXMuaW5wdXRNb2RlbENoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5pbnB1dE1vZGVsQ2hhbmdlU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlT3V0cHV0TW9kZWxDaGFuZ2VTdWJqZWN0KCk6IHZvaWQge1xuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy5vdXRwdXRNb2RlbENoYW5nZVN1YnNjcmlwdGlvbikpIHtcbiAgICAgIHRoaXMub3V0cHV0TW9kZWxDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMub3V0cHV0TW9kZWxDaGFuZ2VTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVNYW51YWxSZWZyZXNoKCk6IHZvaWQge1xuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy5tYW51YWxSZWZyZXNoU3Vic2NyaXB0aW9uKSkge1xuICAgICAgdGhpcy5tYW51YWxSZWZyZXNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLm1hbnVhbFJlZnJlc2hTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUcmlnZ2VyRm9jdXMoKTogdm9pZCB7XG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnRyaWdnZXJGb2N1c1N1YnNjcmlwdGlvbikpIHtcbiAgICAgIHRoaXMudHJpZ2dlckZvY3VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLnRyaWdnZXJGb2N1c1N1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRQb2ludGVyRWxlbWVudChwb2ludGVyVHlwZTogUG9pbnRlclR5cGUpOiBTbGlkZXJIYW5kbGVEaXJlY3RpdmUge1xuICAgIGlmIChwb2ludGVyVHlwZSA9PT0gUG9pbnRlclR5cGUuTWluKSB7XG4gICAgICByZXR1cm4gdGhpcy5taW5IYW5kbGVFbGVtZW50O1xuICAgIH0gZWxzZSBpZiAocG9pbnRlclR5cGUgPT09IFBvaW50ZXJUeXBlLk1heCkge1xuICAgICAgcmV0dXJuIHRoaXMubWF4SGFuZGxlRWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGdldEN1cnJlbnRUcmFja2luZ1ZhbHVlKCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWluKSB7XG4gICAgICByZXR1cm4gdGhpcy52aWV3TG93VmFsdWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXIgPT09IFBvaW50ZXJUeXBlLk1heCkge1xuICAgICAgcmV0dXJuIHRoaXMudmlld0hpZ2hWYWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIG1vZGVsVmFsdWVUb1ZpZXdWYWx1ZShtb2RlbFZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmIChWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChtb2RlbFZhbHVlKSkge1xuICAgICAgcmV0dXJuIE5hTjtcbiAgICB9XG5cbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuc3RlcHNBcnJheSkgJiYgIXRoaXMudmlld09wdGlvbnMuYmluZEluZGV4Rm9yU3RlcHNBcnJheSkge1xuICAgICAgcmV0dXJuIFZhbHVlSGVscGVyLmZpbmRTdGVwSW5kZXgoK21vZGVsVmFsdWUsIHRoaXMudmlld09wdGlvbnMuc3RlcHNBcnJheSk7XG4gICAgfVxuICAgIHJldHVybiArbW9kZWxWYWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgdmlld1ZhbHVlVG9Nb2RlbFZhbHVlKHZpZXdWYWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuc3RlcHNBcnJheSkgJiYgIXRoaXMudmlld09wdGlvbnMuYmluZEluZGV4Rm9yU3RlcHNBcnJheSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RlcFZhbHVlKHZpZXdWYWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2aWV3VmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGdldFN0ZXBWYWx1ZShzbGlkZXJWYWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBzdGVwOiBDdXN0b21TdGVwRGVmaW5pdGlvbiA9IHRoaXMudmlld09wdGlvbnMuc3RlcHNBcnJheVtzbGlkZXJWYWx1ZV07XG4gICAgcmV0dXJuICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQoc3RlcCkpID8gc3RlcC52YWx1ZSA6IE5hTjtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlWaWV3Q2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLnZpZXdWYWx1ZVRvTW9kZWxWYWx1ZSh0aGlzLnZpZXdMb3dWYWx1ZSk7XG4gICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgIHRoaXMuaGlnaFZhbHVlID0gdGhpcy52aWV3VmFsdWVUb01vZGVsVmFsdWUodGhpcy52aWV3SGlnaFZhbHVlKTtcbiAgICB9XG5cbiAgICB0aGlzLm91dHB1dE1vZGVsQ2hhbmdlU3ViamVjdC5uZXh0KHtcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgaGlnaFZhbHVlOiB0aGlzLmhpZ2hWYWx1ZSxcbiAgICAgIHVzZXJFdmVudEluaXRpYXRlZDogdHJ1ZSxcbiAgICAgIGZvcmNlQ2hhbmdlOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgLy8gQXQgdGhpcyBwb2ludCBhbGwgY2hhbmdlcyBhcmUgYXBwbGllZCBhbmQgb3V0cHV0cyBhcmUgZW1pdHRlZCwgc28gd2Ugc2hvdWxkIGJlIGRvbmUuXG4gICAgLy8gSG93ZXZlciwgaW5wdXQgY2hhbmdlcyBhcmUgY29tbXVuaWNhdGVkIGluIGRpZmZlcmVudCBzdHJlYW0gYW5kIHdlIG5lZWQgdG8gYmUgcmVhZHkgdG9cbiAgICAvLyBhY3Qgb24gdGhlIG5leHQgaW5wdXQgY2hhbmdlIGV2ZW4gaWYgaXQgaXMgZXhhY3RseSB0aGUgc2FtZSBhcyBsYXN0IGlucHV0IGNoYW5nZS5cbiAgICAvLyBUaGVyZWZvcmUsIHdlIHNlbmQgYSBzcGVjaWFsIGV2ZW50IHRvIHJlc2V0IHRoZSBzdHJlYW0uXG4gICAgdGhpcy5pbnB1dE1vZGVsQ2hhbmdlU3ViamVjdC5uZXh0KHtcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgaGlnaFZhbHVlOiB0aGlzLmhpZ2hWYWx1ZSxcbiAgICAgIGZvcmNlQ2hhbmdlOiBmYWxzZSxcbiAgICAgIGludGVybmFsQ2hhbmdlOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICAvLyBBcHBseSBtb2RlbCBjaGFuZ2UgdG8gdGhlIHNsaWRlciB2aWV3XG4gIHByaXZhdGUgYXBwbHlJbnB1dE1vZGVsQ2hhbmdlKG1vZGVsQ2hhbmdlOiBJbnB1dE1vZGVsQ2hhbmdlKTogdm9pZCB7XG4gICAgY29uc3Qgbm9ybWFsaXNlZE1vZGVsQ2hhbmdlOiBNb2RlbFZhbHVlcyA9IHRoaXMubm9ybWFsaXNlTW9kZWxWYWx1ZXMobW9kZWxDaGFuZ2UpO1xuXG4gICAgLy8gSWYgbm9ybWFsaXNlZCBtb2RlbCBjaGFuZ2UgaXMgZGlmZmVyZW50LCBhcHBseSB0aGUgY2hhbmdlIHRvIHRoZSBtb2RlbCB2YWx1ZXNcbiAgICBjb25zdCBub3JtYWxpc2F0aW9uQ2hhbmdlOiBib29sZWFuID0gIU1vZGVsVmFsdWVzLmNvbXBhcmUobW9kZWxDaGFuZ2UsIG5vcm1hbGlzZWRNb2RlbENoYW5nZSk7XG4gICAgaWYgKG5vcm1hbGlzYXRpb25DaGFuZ2UpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBub3JtYWxpc2VkTW9kZWxDaGFuZ2UudmFsdWU7XG4gICAgICB0aGlzLmhpZ2hWYWx1ZSA9IG5vcm1hbGlzZWRNb2RlbENoYW5nZS5oaWdoVmFsdWU7XG4gICAgfVxuXG4gICAgdGhpcy52aWV3TG93VmFsdWUgPSB0aGlzLm1vZGVsVmFsdWVUb1ZpZXdWYWx1ZShub3JtYWxpc2VkTW9kZWxDaGFuZ2UudmFsdWUpO1xuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICB0aGlzLnZpZXdIaWdoVmFsdWUgPSB0aGlzLm1vZGVsVmFsdWVUb1ZpZXdWYWx1ZShub3JtYWxpc2VkTW9kZWxDaGFuZ2UuaGlnaFZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52aWV3SGlnaFZhbHVlID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUxvd0hhbmRsZSh0aGlzLnZhbHVlVG9Qb3NpdGlvbih0aGlzLnZpZXdMb3dWYWx1ZSkpO1xuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUhpZ2hIYW5kbGUodGhpcy52YWx1ZVRvUG9zaXRpb24odGhpcy52aWV3SGlnaFZhbHVlKSk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uQmFyKCk7XG4gICAgdGhpcy51cGRhdGVUaWNrc1NjYWxlKCk7XG4gICAgdGhpcy51cGRhdGVBcmlhQXR0cmlidXRlcygpO1xuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNvbWJpbmVkTGFiZWwoKTtcbiAgICB9XG5cbiAgICAvLyBBdCB0aGUgZW5kLCB3ZSBuZWVkIHRvIGNvbW11bmljYXRlIHRoZSBtb2RlbCBjaGFuZ2UgdG8gdGhlIG91dHB1dHMgYXMgd2VsbFxuICAgIC8vIE5vcm1hbGlzYXRpb24gY2hhbmdlcyBhcmUgYWxzbyBhbHdheXMgZm9yY2VkIG91dCB0byBlbnN1cmUgdGhhdCBzdWJzY3JpYmVycyBhbHdheXMgZW5kIHVwIGluIGNvcnJlY3Qgc3RhdGVcbiAgICB0aGlzLm91dHB1dE1vZGVsQ2hhbmdlU3ViamVjdC5uZXh0KHtcbiAgICAgIHZhbHVlOiBub3JtYWxpc2VkTW9kZWxDaGFuZ2UudmFsdWUsXG4gICAgICBoaWdoVmFsdWU6IG5vcm1hbGlzZWRNb2RlbENoYW5nZS5oaWdoVmFsdWUsXG4gICAgICBmb3JjZUNoYW5nZTogbm9ybWFsaXNhdGlvbkNoYW5nZSxcbiAgICAgIHVzZXJFdmVudEluaXRpYXRlZDogZmFsc2VcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFB1Ymxpc2ggbW9kZWwgY2hhbmdlIHRvIG91dHB1dCBldmVudCBlbWl0dGVycyBhbmQgcmVnaXN0ZXJlZCBjYWxsYmFja3NcbiAgcHJpdmF0ZSBwdWJsaXNoT3V0cHV0TW9kZWxDaGFuZ2UobW9kZWxDaGFuZ2U6IE91dHB1dE1vZGVsQ2hhbmdlKTogdm9pZCB7XG4gICAgY29uc3QgZW1pdE91dHB1dHM6ICgpID0+IHZvaWQgPSAoKTogdm9pZCA9PiB7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQobW9kZWxDaGFuZ2UudmFsdWUpO1xuICAgICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgICAgdGhpcy5oaWdoVmFsdWVDaGFuZ2UuZW1pdChtb2RlbENoYW5nZS5oaWdoVmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMub25DaGFuZ2VDYWxsYmFjaykpIHtcbiAgICAgICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soW21vZGVsQ2hhbmdlLnZhbHVlLCBtb2RlbENoYW5nZS5oaWdoVmFsdWVdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sobW9kZWxDaGFuZ2UudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMub25Ub3VjaGVkQ2FsbGJhY2spKSB7XG4gICAgICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayhbbW9kZWxDaGFuZ2UudmFsdWUsIG1vZGVsQ2hhbmdlLmhpZ2hWYWx1ZV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sobW9kZWxDaGFuZ2UudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChtb2RlbENoYW5nZS51c2VyRXZlbnRJbml0aWF0ZWQpIHtcbiAgICAgIC8vIElmIHRoaXMgY2hhbmdlIHdhcyBpbml0aWF0ZWQgYnkgYSB1c2VyIGV2ZW50LCB3ZSBjYW4gZW1pdCBvdXRwdXRzIGluIHRoZSBzYW1lIHRpY2tcbiAgICAgIGVtaXRPdXRwdXRzKCk7XG4gICAgICB0aGlzLnVzZXJDaGFuZ2UuZW1pdCh0aGlzLmdldENoYW5nZUNvbnRleHQoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEJ1dCwgaWYgdGhlIGNoYW5nZSB3YXMgaW5pdGF0ZWQgYnkgc29tZXRoaW5nIGVsc2UgbGlrZSBhIGNoYW5nZSBpbiBpbnB1dCBiaW5kaW5ncyxcbiAgICAgIC8vIHdlIG5lZWQgdG8gd2FpdCB1bnRpbCBuZXh0IHRpY2sgdG8gZW1pdCB0aGUgb3V0cHV0cyB0byBrZWVwIEFuZ3VsYXIgY2hhbmdlIGRldGVjdGlvbiBoYXBweVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IGVtaXRPdXRwdXRzKCk7IH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbm9ybWFsaXNlTW9kZWxWYWx1ZXMoaW5wdXQ6IE1vZGVsVmFsdWVzKTogTW9kZWxWYWx1ZXMge1xuICAgIGNvbnN0IG5vcm1hbGlzZWRJbnB1dDogTW9kZWxWYWx1ZXMgPSBuZXcgTW9kZWxWYWx1ZXMoKTtcbiAgICBub3JtYWxpc2VkSW5wdXQudmFsdWUgPSBpbnB1dC52YWx1ZTtcbiAgICBub3JtYWxpc2VkSW5wdXQuaGlnaFZhbHVlID0gaW5wdXQuaGlnaFZhbHVlO1xuXG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnN0ZXBzQXJyYXkpKSB7XG4gICAgICAvLyBXaGVuIHVzaW5nIHN0ZXBzIGFycmF5LCBvbmx5IHJvdW5kIHRvIG5lYXJlc3Qgc3RlcCBpbiB0aGUgYXJyYXlcbiAgICAgIC8vIE5vIG90aGVyIGVuZm9yY2VtZW50IGNhbiBiZSBkb25lLCBhcyB0aGUgc3RlcCBhcnJheSBtYXkgYmUgb3V0IG9mIG9yZGVyLCBhbmQgdGhhdCBpcyBwZXJmZWN0bHkgZmluZVxuICAgICAgaWYgKHRoaXMudmlld09wdGlvbnMuZW5mb3JjZVN0ZXBzQXJyYXkpIHtcbiAgICAgICAgY29uc3QgdmFsdWVJbmRleDogbnVtYmVyID0gVmFsdWVIZWxwZXIuZmluZFN0ZXBJbmRleChub3JtYWxpc2VkSW5wdXQudmFsdWUsIHRoaXMudmlld09wdGlvbnMuc3RlcHNBcnJheSk7XG4gICAgICAgIG5vcm1hbGlzZWRJbnB1dC52YWx1ZSA9IHRoaXMudmlld09wdGlvbnMuc3RlcHNBcnJheVt2YWx1ZUluZGV4XS52YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgICAgIGNvbnN0IGhpZ2hWYWx1ZUluZGV4OiBudW1iZXIgPSBWYWx1ZUhlbHBlci5maW5kU3RlcEluZGV4KG5vcm1hbGlzZWRJbnB1dC5oaWdoVmFsdWUsIHRoaXMudmlld09wdGlvbnMuc3RlcHNBcnJheSk7XG4gICAgICAgICAgbm9ybWFsaXNlZElucHV0LmhpZ2hWYWx1ZSA9IHRoaXMudmlld09wdGlvbnMuc3RlcHNBcnJheVtoaWdoVmFsdWVJbmRleF0udmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5vcm1hbGlzZWRJbnB1dDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5lbmZvcmNlU3RlcCkge1xuICAgICAgbm9ybWFsaXNlZElucHV0LnZhbHVlID0gdGhpcy5yb3VuZFN0ZXAobm9ybWFsaXNlZElucHV0LnZhbHVlKTtcbiAgICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICAgIG5vcm1hbGlzZWRJbnB1dC5oaWdoVmFsdWUgPSB0aGlzLnJvdW5kU3RlcChub3JtYWxpc2VkSW5wdXQuaGlnaFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5lbmZvcmNlUmFuZ2UpIHtcbiAgICAgIG5vcm1hbGlzZWRJbnB1dC52YWx1ZSA9IE1hdGhIZWxwZXIuY2xhbXBUb1JhbmdlKG5vcm1hbGlzZWRJbnB1dC52YWx1ZSwgdGhpcy52aWV3T3B0aW9ucy5mbG9vciwgdGhpcy52aWV3T3B0aW9ucy5jZWlsKTtcblxuICAgICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgICAgbm9ybWFsaXNlZElucHV0LmhpZ2hWYWx1ZSA9IE1hdGhIZWxwZXIuY2xhbXBUb1JhbmdlKG5vcm1hbGlzZWRJbnB1dC5oaWdoVmFsdWUsIHRoaXMudmlld09wdGlvbnMuZmxvb3IsIHRoaXMudmlld09wdGlvbnMuY2VpbCk7XG4gICAgICB9XG5cbiAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHJhbmdlIHNsaWRlciBpbnZhcmlhbnQgKHZhbHVlIDw9IGhpZ2hWYWx1ZSkgaXMgYWx3YXlzIHNhdGlzZmllZFxuICAgICAgaWYgKHRoaXMucmFuZ2UgJiYgaW5wdXQudmFsdWUgPiBpbnB1dC5oaWdoVmFsdWUpIHtcbiAgICAgICAgLy8gV2Uga25vdyB0aGF0IGJvdGggdmFsdWVzIGFyZSBub3cgY2xhbXBlZCBjb3JyZWN0bHksIHRoZXkgbWF5IGp1c3QgYmUgaW4gdGhlIHdyb25nIG9yZGVyXG4gICAgICAgIC8vIFNvIHRoZSBlYXN5IHNvbHV0aW9uIGlzIHRvIHN3YXAgdGhlbS4uLiBleGNlcHQgc3dhcHBpbmcgaXMgc29tZXRpbWVzIGRpc2FibGVkIGluIG9wdGlvbnMsIHNvIHdlIG1ha2UgdGhlIHR3byB2YWx1ZXMgdGhlIHNhbWVcbiAgICAgICAgaWYgKHRoaXMudmlld09wdGlvbnMubm9Td2l0Y2hpbmcpIHtcbiAgICAgICAgICBub3JtYWxpc2VkSW5wdXQudmFsdWUgPSBub3JtYWxpc2VkSW5wdXQuaGlnaFZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHRlbXBWYWx1ZTogbnVtYmVyID0gaW5wdXQudmFsdWU7XG4gICAgICAgICAgbm9ybWFsaXNlZElucHV0LnZhbHVlID0gaW5wdXQuaGlnaFZhbHVlO1xuICAgICAgICAgIG5vcm1hbGlzZWRJbnB1dC5oaWdoVmFsdWUgPSB0ZW1wVmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbm9ybWFsaXNlZElucHV0O1xuICB9XG5cbiAgcHJpdmF0ZSByZW5vcm1hbGlzZU1vZGVsVmFsdWVzKCk6IHZvaWQge1xuICAgIGNvbnN0IHByZXZpb3VzTW9kZWxWYWx1ZXM6IE1vZGVsVmFsdWVzID0ge1xuICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICBoaWdoVmFsdWU6IHRoaXMuaGlnaFZhbHVlXG4gICAgfTtcbiAgICBjb25zdCBub3JtYWxpc2VkTW9kZWxWYWx1ZXM6IE1vZGVsVmFsdWVzID0gdGhpcy5ub3JtYWxpc2VNb2RlbFZhbHVlcyhwcmV2aW91c01vZGVsVmFsdWVzKTtcbiAgICBpZiAoIU1vZGVsVmFsdWVzLmNvbXBhcmUobm9ybWFsaXNlZE1vZGVsVmFsdWVzLCBwcmV2aW91c01vZGVsVmFsdWVzKSkge1xuICAgICAgdGhpcy52YWx1ZSA9IG5vcm1hbGlzZWRNb2RlbFZhbHVlcy52YWx1ZTtcbiAgICAgIHRoaXMuaGlnaFZhbHVlID0gbm9ybWFsaXNlZE1vZGVsVmFsdWVzLmhpZ2hWYWx1ZTtcblxuICAgICAgdGhpcy5vdXRwdXRNb2RlbENoYW5nZVN1YmplY3QubmV4dCh7XG4gICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICBoaWdoVmFsdWU6IHRoaXMuaGlnaFZhbHVlLFxuICAgICAgICBmb3JjZUNoYW5nZTogdHJ1ZSxcbiAgICAgICAgdXNlckV2ZW50SW5pdGlhdGVkOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZU9wdGlvbnMoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmluaXRIYXNSdW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2aW91c0lucHV0RXZlbnRzSW50ZXJ2YWw6IG51bWJlciA9IHRoaXMudmlld09wdGlvbnMuaW5wdXRFdmVudHNJbnRlcnZhbDtcbiAgICBjb25zdCBwcmV2aW91c091dHB1dEV2ZW50c0ludGVydmFsOiBudW1iZXIgPSB0aGlzLnZpZXdPcHRpb25zLm91dHB1dEV2ZW50c0ludGVydmFsO1xuXG4gICAgY29uc3QgcHJldmlvdXNPcHRpb25zSW5mbHVlbmNpbmdFdmVudEJpbmRpbmdzOiBib29sZWFuW10gPSB0aGlzLmdldE9wdGlvbnNJbmZsdWVuY2luZ0V2ZW50QmluZGluZ3ModGhpcy52aWV3T3B0aW9ucyk7XG5cbiAgICB0aGlzLmFwcGx5T3B0aW9ucygpO1xuXG4gICAgY29uc3QgbmV3T3B0aW9uc0luZmx1ZW5jaW5nRXZlbnRCaW5kaW5nczogYm9vbGVhbltdID0gdGhpcy5nZXRPcHRpb25zSW5mbHVlbmNpbmdFdmVudEJpbmRpbmdzKHRoaXMudmlld09wdGlvbnMpO1xuICAgIC8vIEF2b2lkIHJlLWJpbmRpbmcgZXZlbnRzIGluIGNhc2Ugbm90aGluZyBjaGFuZ2VzIHRoYXQgY2FuIGluZmx1ZW5jZSBpdFxuICAgIC8vIEl0IG1ha2VzIGl0IHBvc3NpYmxlIHRvIGNoYW5nZSBvcHRpb25zIHdoaWxlIGRyYWdnaW5nIHRoZSBzbGlkZXJcbiAgICBjb25zdCByZWJpbmRFdmVudHM6IGJvb2xlYW4gPSAhVmFsdWVIZWxwZXIuYXJlQXJyYXlzRXF1YWwocHJldmlvdXNPcHRpb25zSW5mbHVlbmNpbmdFdmVudEJpbmRpbmdzLCBuZXdPcHRpb25zSW5mbHVlbmNpbmdFdmVudEJpbmRpbmdzKTtcblxuICAgIGlmIChwcmV2aW91c0lucHV0RXZlbnRzSW50ZXJ2YWwgIT09IHRoaXMudmlld09wdGlvbnMuaW5wdXRFdmVudHNJbnRlcnZhbCkge1xuICAgICAgdGhpcy51bnN1YnNjcmliZUlucHV0TW9kZWxDaGFuZ2VTdWJqZWN0KCk7XG4gICAgICB0aGlzLnN1YnNjcmliZUlucHV0TW9kZWxDaGFuZ2VTdWJqZWN0KHRoaXMudmlld09wdGlvbnMuaW5wdXRFdmVudHNJbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgaWYgKHByZXZpb3VzT3V0cHV0RXZlbnRzSW50ZXJ2YWwgIT09IHRoaXMudmlld09wdGlvbnMub3V0cHV0RXZlbnRzSW50ZXJ2YWwpIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmVJbnB1dE1vZGVsQ2hhbmdlU3ViamVjdCgpO1xuICAgICAgdGhpcy5zdWJzY3JpYmVJbnB1dE1vZGVsQ2hhbmdlU3ViamVjdCh0aGlzLnZpZXdPcHRpb25zLm91dHB1dEV2ZW50c0ludGVydmFsKTtcbiAgICB9XG5cbiAgICAvLyBXaXRoIG5ldyBvcHRpb25zLCB3ZSBuZWVkIHRvIHJlLW5vcm1hbGlzZSBtb2RlbCB2YWx1ZXMgaWYgbmVjZXNzYXJ5XG4gICAgdGhpcy5yZW5vcm1hbGlzZU1vZGVsVmFsdWVzKCk7XG5cbiAgICB0aGlzLnZpZXdMb3dWYWx1ZSA9IHRoaXMubW9kZWxWYWx1ZVRvVmlld1ZhbHVlKHRoaXMudmFsdWUpO1xuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICB0aGlzLnZpZXdIaWdoVmFsdWUgPSB0aGlzLm1vZGVsVmFsdWVUb1ZpZXdWYWx1ZSh0aGlzLmhpZ2hWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlld0hpZ2hWYWx1ZSA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5yZXNldFNsaWRlcihyZWJpbmRFdmVudHMpO1xuICB9XG5cbiAgLy8gUmVhZCB0aGUgdXNlciBvcHRpb25zIGFuZCBhcHBseSB0aGVtIHRvIHRoZSBzbGlkZXIgbW9kZWxcbiAgcHJpdmF0ZSBhcHBseU9wdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3T3B0aW9ucyA9IG5ldyBPcHRpb25zKCk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLnZpZXdPcHRpb25zLCB0aGlzLm9wdGlvbnMpO1xuXG4gICAgdGhpcy52aWV3T3B0aW9ucy5kcmFnZ2FibGVSYW5nZSA9IHRoaXMucmFuZ2UgJiYgdGhpcy52aWV3T3B0aW9ucy5kcmFnZ2FibGVSYW5nZTtcbiAgICB0aGlzLnZpZXdPcHRpb25zLmRyYWdnYWJsZVJhbmdlT25seSA9IHRoaXMucmFuZ2UgJiYgdGhpcy52aWV3T3B0aW9ucy5kcmFnZ2FibGVSYW5nZU9ubHk7XG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMuZHJhZ2dhYmxlUmFuZ2VPbmx5KSB7XG4gICAgICB0aGlzLnZpZXdPcHRpb25zLmRyYWdnYWJsZVJhbmdlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLnZpZXdPcHRpb25zLnNob3dUaWNrcyA9IHRoaXMudmlld09wdGlvbnMuc2hvd1RpY2tzIHx8XG4gICAgICB0aGlzLnZpZXdPcHRpb25zLnNob3dUaWNrc1ZhbHVlcyB8fFxuICAgICAgIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMudGlja3NBcnJheSk7XG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMuc2hvd1RpY2tzICYmXG4gICAgICAgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnRpY2tTdGVwKSB8fCAhVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy50aWNrc0FycmF5KSkpIHtcbiAgICAgIHRoaXMuaW50ZXJtZWRpYXRlVGlja3MgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhciA9IHRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhciB8fFxuICAgICAgdGhpcy52aWV3T3B0aW9ucy5zaG93U2VsZWN0aW9uQmFyRW5kIHx8XG4gICAgICAhVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5zaG93U2VsZWN0aW9uQmFyRnJvbVZhbHVlKTtcblxuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5zdGVwc0FycmF5KSkge1xuICAgICAgdGhpcy5hcHBseVN0ZXBzQXJyYXlPcHRpb25zKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXBwbHlGbG9vckNlaWxPcHRpb25zKCk7XG4gICAgfVxuXG4gICAgaWYgKFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuY29tYmluZUxhYmVscykpIHtcbiAgICAgIHRoaXMudmlld09wdGlvbnMuY29tYmluZUxhYmVscyA9IChtaW5WYWx1ZTogc3RyaW5nLCBtYXhWYWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgICAgcmV0dXJuIG1pblZhbHVlICsgJyAtICcgKyBtYXhWYWx1ZTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMubG9nU2NhbGUgJiYgdGhpcy52aWV3T3B0aW9ucy5mbG9vciA9PT0gMCkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0NhblxcJ3QgdXNlIGZsb29yPTAgd2l0aCBsb2dhcml0aG1pYyBzY2FsZScpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlTdGVwc0FycmF5T3B0aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdPcHRpb25zLmZsb29yID0gMDtcbiAgICB0aGlzLnZpZXdPcHRpb25zLmNlaWwgPSB0aGlzLnZpZXdPcHRpb25zLnN0ZXBzQXJyYXkubGVuZ3RoIC0gMTtcbiAgICB0aGlzLnZpZXdPcHRpb25zLnN0ZXAgPSAxO1xuXG4gICAgaWYgKFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMudHJhbnNsYXRlKSkge1xuICAgICAgdGhpcy52aWV3T3B0aW9ucy50cmFuc2xhdGUgPSAobW9kZWxWYWx1ZTogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgICAgICAgaWYgKHRoaXMudmlld09wdGlvbnMuYmluZEluZGV4Rm9yU3RlcHNBcnJheSkge1xuICAgICAgICAgIHJldHVybiBTdHJpbmcodGhpcy5nZXRTdGVwVmFsdWUobW9kZWxWYWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTdHJpbmcobW9kZWxWYWx1ZSk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlGbG9vckNlaWxPcHRpb25zKCk6IHZvaWQge1xuICAgIGlmIChWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnN0ZXApKSB7XG4gICAgICB0aGlzLnZpZXdPcHRpb25zLnN0ZXAgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXdPcHRpb25zLnN0ZXAgPSArdGhpcy52aWV3T3B0aW9ucy5zdGVwO1xuICAgICAgaWYgKHRoaXMudmlld09wdGlvbnMuc3RlcCA8PSAwKSB7XG4gICAgICAgIHRoaXMudmlld09wdGlvbnMuc3RlcCA9IDE7XG4gICAgIH1cbiAgICB9XG5cbiAgICBpZiAoVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5jZWlsKSB8fFxuICAgICAgICBWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLmZsb29yKSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ2Zsb29yIGFuZCBjZWlsIG9wdGlvbnMgbXVzdCBiZSBzdXBwbGllZCcpO1xuICAgIH1cbiAgICB0aGlzLnZpZXdPcHRpb25zLmNlaWwgPSArdGhpcy52aWV3T3B0aW9ucy5jZWlsO1xuICAgIHRoaXMudmlld09wdGlvbnMuZmxvb3IgPSArdGhpcy52aWV3T3B0aW9ucy5mbG9vcjtcblxuICAgIGlmIChWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnRyYW5zbGF0ZSkpIHtcbiAgICAgIHRoaXMudmlld09wdGlvbnMudHJhbnNsYXRlID0gKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcgPT4gU3RyaW5nKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXNldHMgc2xpZGVyXG4gIHByaXZhdGUgcmVzZXRTbGlkZXIocmViaW5kRXZlbnRzOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgIHRoaXMubWFuYWdlRWxlbWVudHNTdHlsZSgpO1xuICAgIHRoaXMuYWRkQWNjZXNzaWJpbGl0eSgpO1xuICAgIHRoaXMudXBkYXRlQ2VpbExhYmVsKCk7XG4gICAgdGhpcy51cGRhdGVGbG9vckxhYmVsKCk7XG4gICAgaWYgKHJlYmluZEV2ZW50cykge1xuICAgICAgdGhpcy51bmJpbmRFdmVudHMoKTtcbiAgICAgIHRoaXMubWFuYWdlRXZlbnRzQmluZGluZ3MoKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVEaXNhYmxlZFN0YXRlKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVWaWV3RGltZW5zaW9ucygpO1xuICAgIHRoaXMucmVmb2N1c1BvaW50ZXJJZk5lZWRlZCgpO1xuICB9XG5cbiAgLy8gU2V0cyBmb2N1cyBvbiB0aGUgc3BlY2lmaWVkIHBvaW50ZXJcbiAgcHJpdmF0ZSBmb2N1c1BvaW50ZXIocG9pbnRlclR5cGU6IFBvaW50ZXJUeXBlKTogdm9pZCB7XG4gICAgLy8gSWYgbm90IHN1cHBsaWVkLCB1c2UgbWluIHBvaW50ZXIgYXMgZGVmYXVsdFxuICAgIGlmIChwb2ludGVyVHlwZSAhPT0gUG9pbnRlclR5cGUuTWluICYmIHBvaW50ZXJUeXBlICE9PSBQb2ludGVyVHlwZS5NYXgpIHtcbiAgICAgIHBvaW50ZXJUeXBlID0gUG9pbnRlclR5cGUuTWluO1xuICAgIH1cblxuICAgIGlmIChwb2ludGVyVHlwZSA9PT0gUG9pbnRlclR5cGUuTWluKSB7XG4gICAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucmFuZ2UgJiYgcG9pbnRlclR5cGUgPT09IFBvaW50ZXJUeXBlLk1heCkge1xuICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWZvY3VzUG9pbnRlcklmTmVlZGVkKCk6IHZvaWQge1xuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy5jdXJyZW50Rm9jdXNQb2ludGVyKSkge1xuICAgICAgdGhpcy5vblBvaW50ZXJGb2N1cyh0aGlzLmN1cnJlbnRGb2N1c1BvaW50ZXIpO1xuICAgICAgY29uc3QgZWxlbWVudDogU2xpZGVySGFuZGxlRGlyZWN0aXZlID0gdGhpcy5nZXRQb2ludGVyRWxlbWVudCh0aGlzLmN1cnJlbnRGb2N1c1BvaW50ZXIpO1xuICAgICAgZWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVwZGF0ZSBlYWNoIGVsZW1lbnRzIHN0eWxlIGJhc2VkIG9uIG9wdGlvbnNcbiAgcHJpdmF0ZSBtYW5hZ2VFbGVtZW50c1N0eWxlKCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlU2NhbGUoKTtcblxuICAgIHRoaXMuZmxvb3JMYWJlbEVsZW1lbnQuc2V0QWx3YXlzSGlkZSh0aGlzLnZpZXdPcHRpb25zLnNob3dUaWNrc1ZhbHVlcyB8fCB0aGlzLnZpZXdPcHRpb25zLmhpZGVMaW1pdExhYmVscyk7XG4gICAgdGhpcy5jZWlsTGFiZWxFbGVtZW50LnNldEFsd2F5c0hpZGUodGhpcy52aWV3T3B0aW9ucy5zaG93VGlja3NWYWx1ZXMgfHwgdGhpcy52aWV3T3B0aW9ucy5oaWRlTGltaXRMYWJlbHMpO1xuXG4gICAgY29uc3QgaGlkZUxhYmVsc0ZvclRpY2tzOiBib29sZWFuID0gdGhpcy52aWV3T3B0aW9ucy5zaG93VGlja3NWYWx1ZXMgJiYgIXRoaXMuaW50ZXJtZWRpYXRlVGlja3M7XG4gICAgdGhpcy5taW5IYW5kbGVMYWJlbEVsZW1lbnQuc2V0QWx3YXlzSGlkZShoaWRlTGFiZWxzRm9yVGlja3MgfHwgdGhpcy52aWV3T3B0aW9ucy5oaWRlUG9pbnRlckxhYmVscyk7XG4gICAgdGhpcy5tYXhIYW5kbGVMYWJlbEVsZW1lbnQuc2V0QWx3YXlzSGlkZShoaWRlTGFiZWxzRm9yVGlja3MgfHwgIXRoaXMucmFuZ2UgfHwgdGhpcy52aWV3T3B0aW9ucy5oaWRlUG9pbnRlckxhYmVscyk7XG4gICAgdGhpcy5jb21iaW5lZExhYmVsRWxlbWVudC5zZXRBbHdheXNIaWRlKGhpZGVMYWJlbHNGb3JUaWNrcyB8fCAhdGhpcy5yYW5nZSB8fCB0aGlzLnZpZXdPcHRpb25zLmhpZGVQb2ludGVyTGFiZWxzKTtcbiAgICB0aGlzLnNlbGVjdGlvbkJhckVsZW1lbnQuc2V0QWx3YXlzSGlkZSghdGhpcy5yYW5nZSAmJiAhdGhpcy52aWV3T3B0aW9ucy5zaG93U2VsZWN0aW9uQmFyKTtcbiAgICB0aGlzLmxlZnRPdXRlclNlbGVjdGlvbkJhckVsZW1lbnQuc2V0QWx3YXlzSGlkZSghdGhpcy5yYW5nZSB8fCAhdGhpcy52aWV3T3B0aW9ucy5zaG93T3V0ZXJTZWxlY3Rpb25CYXJzKTtcbiAgICB0aGlzLnJpZ2h0T3V0ZXJTZWxlY3Rpb25CYXJFbGVtZW50LnNldEFsd2F5c0hpZGUoIXRoaXMucmFuZ2UgfHwgIXRoaXMudmlld09wdGlvbnMuc2hvd091dGVyU2VsZWN0aW9uQmFycyk7XG5cbiAgICB0aGlzLmZ1bGxCYXJUcmFuc3BhcmVudENsYXNzID0gdGhpcy5yYW5nZSAmJiB0aGlzLnZpZXdPcHRpb25zLnNob3dPdXRlclNlbGVjdGlvbkJhcnM7XG4gICAgdGhpcy5zZWxlY3Rpb25CYXJEcmFnZ2FibGVDbGFzcyA9IHRoaXMudmlld09wdGlvbnMuZHJhZ2dhYmxlUmFuZ2UgJiYgIXRoaXMudmlld09wdGlvbnMub25seUJpbmRIYW5kbGVzO1xuICAgIHRoaXMudGlja3NVbmRlclZhbHVlc0NsYXNzID0gdGhpcy5pbnRlcm1lZGlhdGVUaWNrcyAmJiB0aGlzLm9wdGlvbnMuc2hvd1RpY2tzVmFsdWVzO1xuXG4gICAgaWYgKHRoaXMuc2xpZGVyRWxlbWVudFZlcnRpY2FsQ2xhc3MgIT09IHRoaXMudmlld09wdGlvbnMudmVydGljYWwpIHtcbiAgICAgIHRoaXMudXBkYXRlVmVydGljYWxTdGF0ZSgpO1xuICAgICAgLy8gVGhlIGFib3ZlIGNoYW5nZSBpbiBob3N0IGNvbXBvbmVudCBjbGFzcyB3aWxsIG5vdCBiZSBhcHBsaWVkIHVudGlsIHRoZSBlbmQgb2YgdGhpcyBjeWNsZVxuICAgICAgLy8gSG93ZXZlciwgZnVuY3Rpb25zIGNhbGN1bGF0aW5nIHRoZSBzbGlkZXIgcG9zaXRpb24gZXhwZWN0IHRoZSBzbGlkZXIgdG8gYmUgYWxyZWFkeSBzdHlsZWQgYXMgdmVydGljYWxcbiAgICAgIC8vIFNvIGFzIGEgd29ya2Fyb3VuZCwgd2UgbmVlZCB0byByZXNldCB0aGUgc2xpZGVyIG9uY2UgYWdhaW4gdG8gY29tcHV0ZSB0aGUgY29ycmVjdCB2YWx1ZXNcbiAgICAgIHNldFRpbWVvdXQoKCk6IHZvaWQgPT4geyB0aGlzLnJlc2V0U2xpZGVyKCk7IH0pO1xuICAgIH1cblxuICAgIC8vIENoYW5naW5nIGFuaW1hdGUgY2xhc3MgbWF5IGludGVyZmVyZSB3aXRoIHNsaWRlciByZXNldC9pbml0aWFsaXNhdGlvbiwgc28gd2Ugc2hvdWxkIHNldCBpdCBzZXBhcmF0ZWx5LFxuICAgIC8vIGFmdGVyIGFsbCBpcyBwcm9wZXJseSBzZXQgdXBcbiAgICBpZiAodGhpcy5zbGlkZXJFbGVtZW50QW5pbWF0ZUNsYXNzICE9PSB0aGlzLnZpZXdPcHRpb25zLmFuaW1hdGUpIHtcbiAgICAgIHNldFRpbWVvdXQoKCk6IHZvaWQgPT4geyB0aGlzLnNsaWRlckVsZW1lbnRBbmltYXRlQ2xhc3MgPSB0aGlzLnZpZXdPcHRpb25zLmFuaW1hdGU7IH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIE1hbmFnZSB0aGUgZXZlbnRzIGJpbmRpbmdzIGJhc2VkIG9uIHJlYWRPbmx5IGFuZCBkaXNhYmxlZCBvcHRpb25zXG4gIHByaXZhdGUgbWFuYWdlRXZlbnRzQmluZGluZ3MoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMuZGlzYWJsZWQgfHwgdGhpcy52aWV3T3B0aW9ucy5yZWFkT25seSkge1xuICAgICAgdGhpcy51bmJpbmRFdmVudHMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gU2V0IHRoZSBkaXNhYmxlZCBzdGF0ZSBiYXNlZCBvbiBkaXNhYmxlZCBvcHRpb25cbiAgcHJpdmF0ZSB1cGRhdGVEaXNhYmxlZFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuc2xpZGVyRWxlbWVudERpc2FibGVkQXR0ciA9IHRoaXMudmlld09wdGlvbnMuZGlzYWJsZWQgPyAnZGlzYWJsZWQnIDogbnVsbDtcbiAgfVxuXG4gIC8vIFNldCB2ZXJ0aWNhbCBzdGF0ZSBiYXNlZCBvbiB2ZXJ0aWNhbCBvcHRpb25cbiAgcHJpdmF0ZSB1cGRhdGVWZXJ0aWNhbFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuc2xpZGVyRWxlbWVudFZlcnRpY2FsQ2xhc3MgPSB0aGlzLnZpZXdPcHRpb25zLnZlcnRpY2FsO1xuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiB0aGlzLmdldEFsbFNsaWRlckVsZW1lbnRzKCkpIHtcbiAgICAgIC8vIFRoaXMgaXMgYWxzbyBjYWxsZWQgYmVmb3JlIG5nQWZ0ZXJJbml0LCBzbyBuZWVkIHRvIGNoZWNrIHRoYXQgdmlldyBjaGlsZCBiaW5kaW5ncyB3b3JrXG4gICAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKGVsZW1lbnQpKSB7XG4gICAgICAgIGVsZW1lbnQuc2V0VmVydGljYWwodGhpcy52aWV3T3B0aW9ucy52ZXJ0aWNhbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTY2FsZSgpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdGhpcy5nZXRBbGxTbGlkZXJFbGVtZW50cygpKSB7XG4gICAgICBlbGVtZW50LnNldFNjYWxlKHRoaXMudmlld09wdGlvbnMuc2NhbGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0QWxsU2xpZGVyRWxlbWVudHMoKTogU2xpZGVyRWxlbWVudERpcmVjdGl2ZVtdIHtcbiAgICByZXR1cm4gW3RoaXMubGVmdE91dGVyU2VsZWN0aW9uQmFyRWxlbWVudCxcbiAgICAgIHRoaXMucmlnaHRPdXRlclNlbGVjdGlvbkJhckVsZW1lbnQsXG4gICAgICB0aGlzLmZ1bGxCYXJFbGVtZW50LFxuICAgICAgdGhpcy5zZWxlY3Rpb25CYXJFbGVtZW50LFxuICAgICAgdGhpcy5taW5IYW5kbGVFbGVtZW50LFxuICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50LFxuICAgICAgdGhpcy5mbG9vckxhYmVsRWxlbWVudCxcbiAgICAgIHRoaXMuY2VpbExhYmVsRWxlbWVudCxcbiAgICAgIHRoaXMubWluSGFuZGxlTGFiZWxFbGVtZW50LFxuICAgICAgdGhpcy5tYXhIYW5kbGVMYWJlbEVsZW1lbnQsXG4gICAgICB0aGlzLmNvbWJpbmVkTGFiZWxFbGVtZW50LFxuICAgICAgdGhpcy50aWNrc0VsZW1lbnRcbiAgICBdO1xuICB9XG5cbiAgLy8gSW5pdGlhbGl6ZSBzbGlkZXIgaGFuZGxlcyBwb3NpdGlvbnMgYW5kIGxhYmVsc1xuICAvLyBSdW4gb25seSBvbmNlIGR1cmluZyBpbml0aWFsaXphdGlvbiBhbmQgZXZlcnkgdGltZSB2aWV3IHBvcnQgY2hhbmdlcyBzaXplXG4gIHByaXZhdGUgaW5pdEhhbmRsZXMoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVMb3dIYW5kbGUodGhpcy52YWx1ZVRvUG9zaXRpb24odGhpcy52aWV3TG93VmFsdWUpKTtcblxuICAgIC8qXG4gICB0aGUgb3JkZXIgaGVyZSBpcyBpbXBvcnRhbnQgc2luY2UgdGhlIHNlbGVjdGlvbiBiYXIgc2hvdWxkIGJlXG4gICB1cGRhdGVkIGFmdGVyIHRoZSBoaWdoIGhhbmRsZSBidXQgYmVmb3JlIHRoZSBjb21iaW5lZCBsYWJlbFxuICAgKi9cbiAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgdGhpcy51cGRhdGVIaWdoSGFuZGxlKHRoaXMudmFsdWVUb1Bvc2l0aW9uKHRoaXMudmlld0hpZ2hWYWx1ZSkpO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uQmFyKCk7XG5cbiAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgdGhpcy51cGRhdGVDb21iaW5lZExhYmVsKCk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVUaWNrc1NjYWxlKCk7XG4gIH1cblxuICAvLyBBZGRzIGFjY2Vzc2liaWxpdHkgYXR0cmlidXRlcywgcnVuIG9ubHkgb25jZSBkdXJpbmcgaW5pdGlhbGl6YXRpb25cbiAgcHJpdmF0ZSBhZGRBY2Nlc3NpYmlsaXR5KCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlQXJpYUF0dHJpYnV0ZXMoKTtcblxuICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5yb2xlID0gJ3NsaWRlcic7XG5cbiAgICBpZiAoIHRoaXMudmlld09wdGlvbnMua2V5Ym9hcmRTdXBwb3J0ICYmXG4gICAgICAhKHRoaXMudmlld09wdGlvbnMucmVhZE9ubHkgfHwgdGhpcy52aWV3T3B0aW9ucy5kaXNhYmxlZCkgKSB7XG4gICAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQudGFiaW5kZXggPSAnMCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC50YWJpbmRleCA9ICcnO1xuICAgIH1cblxuICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5hcmlhT3JpZW50YXRpb24gPSB0aGlzLnZpZXdPcHRpb25zLnZlcnRpY2FsID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJztcblxuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5hcmlhTGFiZWwpKSB7XG4gICAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQuYXJpYUxhYmVsID0gdGhpcy52aWV3T3B0aW9ucy5hcmlhTGFiZWw7XG4gICAgfSBlbHNlIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5hcmlhTGFiZWxsZWRCeSkpIHtcbiAgICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5hcmlhTGFiZWxsZWRCeSA9IHRoaXMudmlld09wdGlvbnMuYXJpYUxhYmVsbGVkQnk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudC5yb2xlID0gJ3NsaWRlcic7XG5cbiAgICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLmtleWJvYXJkU3VwcG9ydCAmJlxuICAgICAgICAhKHRoaXMudmlld09wdGlvbnMucmVhZE9ubHkgfHwgdGhpcy52aWV3T3B0aW9ucy5kaXNhYmxlZCkpIHtcbiAgICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50LnRhYmluZGV4ID0gJzAnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50LnRhYmluZGV4ID0gJyc7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudC5hcmlhT3JpZW50YXRpb24gPSB0aGlzLnZpZXdPcHRpb25zLnZlcnRpY2FsID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJztcblxuICAgICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLmFyaWFMYWJlbEhpZ2gpKSB7XG4gICAgICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudC5hcmlhTGFiZWwgPSB0aGlzLnZpZXdPcHRpb25zLmFyaWFMYWJlbEhpZ2g7XG4gICAgICB9IGVsc2UgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLmFyaWFMYWJlbGxlZEJ5SGlnaCkpIHtcbiAgICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50LmFyaWFMYWJlbGxlZEJ5ID0gdGhpcy52aWV3T3B0aW9ucy5hcmlhTGFiZWxsZWRCeUhpZ2g7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gVXBkYXRlcyBhcmlhIGF0dHJpYnV0ZXMgYWNjb3JkaW5nIHRvIGN1cnJlbnQgdmFsdWVzXG4gIHByaXZhdGUgdXBkYXRlQXJpYUF0dHJpYnV0ZXMoKTogdm9pZCB7XG4gICAgdGhpcy5taW5IYW5kbGVFbGVtZW50LmFyaWFWYWx1ZU5vdyA9ICgrdGhpcy52YWx1ZSkudG9TdHJpbmcoKTtcbiAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQuYXJpYVZhbHVlVGV4dCA9IHRoaXMudmlld09wdGlvbnMudHJhbnNsYXRlKCt0aGlzLnZhbHVlLCBMYWJlbFR5cGUuTG93KTtcbiAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQuYXJpYVZhbHVlTWluID0gdGhpcy52aWV3T3B0aW9ucy5mbG9vci50b1N0cmluZygpO1xuICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5hcmlhVmFsdWVNYXggPSB0aGlzLnZpZXdPcHRpb25zLmNlaWwudG9TdHJpbmcoKTtcblxuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICB0aGlzLm1heEhhbmRsZUVsZW1lbnQuYXJpYVZhbHVlTm93ID0gKCt0aGlzLmhpZ2hWYWx1ZSkudG9TdHJpbmcoKTtcbiAgICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudC5hcmlhVmFsdWVUZXh0ID0gdGhpcy52aWV3T3B0aW9ucy50cmFuc2xhdGUoK3RoaXMuaGlnaFZhbHVlLCBMYWJlbFR5cGUuSGlnaCk7XG4gICAgICB0aGlzLm1heEhhbmRsZUVsZW1lbnQuYXJpYVZhbHVlTWluID0gdGhpcy52aWV3T3B0aW9ucy5mbG9vci50b1N0cmluZygpO1xuICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50LmFyaWFWYWx1ZU1heCA9IHRoaXMudmlld09wdGlvbnMuY2VpbC50b1N0cmluZygpO1xuICAgIH1cbiAgfVxuXG4gIC8vIENhbGN1bGF0ZSBkaW1lbnNpb25zIHRoYXQgYXJlIGRlcGVuZGVudCBvbiB2aWV3IHBvcnQgc2l6ZVxuICAvLyBSdW4gb25jZSBkdXJpbmcgaW5pdGlhbGl6YXRpb24gYW5kIGV2ZXJ5IHRpbWUgdmlldyBwb3J0IGNoYW5nZXMgc2l6ZS5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucygpOiB2b2lkIHtcbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuaGFuZGxlRGltZW5zaW9uKSkge1xuICAgICAgdGhpcy5taW5IYW5kbGVFbGVtZW50LnNldERpbWVuc2lvbih0aGlzLnZpZXdPcHRpb25zLmhhbmRsZURpbWVuc2lvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5jYWxjdWxhdGVEaW1lbnNpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVXaWR0aDogbnVtYmVyID0gdGhpcy5taW5IYW5kbGVFbGVtZW50LmRpbWVuc2lvbjtcblxuICAgIHRoaXMuaGFuZGxlSGFsZkRpbWVuc2lvbiA9IGhhbmRsZVdpZHRoIC8gMjtcblxuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5iYXJEaW1lbnNpb24pKSB7XG4gICAgICB0aGlzLmZ1bGxCYXJFbGVtZW50LnNldERpbWVuc2lvbih0aGlzLnZpZXdPcHRpb25zLmJhckRpbWVuc2lvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZnVsbEJhckVsZW1lbnQuY2FsY3VsYXRlRGltZW5zaW9uKCk7XG4gICAgfVxuXG4gICAgdGhpcy5tYXhIYW5kbGVQb3NpdGlvbiA9IHRoaXMuZnVsbEJhckVsZW1lbnQuZGltZW5zaW9uIC0gaGFuZGxlV2lkdGg7XG5cbiAgICBpZiAodGhpcy5pbml0SGFzUnVuKSB7XG4gICAgICB0aGlzLnVwZGF0ZUZsb29yTGFiZWwoKTtcbiAgICAgIHRoaXMudXBkYXRlQ2VpbExhYmVsKCk7XG4gICAgICB0aGlzLmluaXRIYW5kbGVzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVWaWV3RGltZW5zaW9uc0FuZERldGVjdENoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy5jYWxjdWxhdGVWaWV3RGltZW5zaW9ucygpO1xuICAgIGlmICghdGhpcy5pc1JlZkRlc3Ryb3llZCgpKSB7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICB9XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIHNsaWRlciByZWZlcmVuY2UgaXMgYWxyZWFkeSBkZXN0cm95ZWRcbiAgICogQHJldHVybnMgYm9vbGVhbiAtIHRydWUgaWYgcmVmIGlzIGRlc3Ryb3llZFxuICAgKi9cbiAgcHJpdmF0ZSBpc1JlZkRlc3Ryb3llZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2VEZXRlY3Rpb25SZWZbJ2Rlc3Ryb3llZCddO1xuICB9XG5cbiAgLy8gVXBkYXRlIHRoZSB0aWNrcyBwb3NpdGlvblxuICBwcml2YXRlIHVwZGF0ZVRpY2tzU2NhbGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnZpZXdPcHRpb25zLnNob3dUaWNrcykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMuc2xpZGVyRWxlbWVudFdpdGhMZWdlbmRDbGFzcyA9IGZhbHNlOyB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0aWNrc0FycmF5OiBudW1iZXJbXSA9ICFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnRpY2tzQXJyYXkpXG4gICAgICA/IHRoaXMudmlld09wdGlvbnMudGlja3NBcnJheVxuICAgICAgOiB0aGlzLmdldFRpY2tzQXJyYXkoKTtcbiAgICBjb25zdCB0cmFuc2xhdGU6IHN0cmluZyA9IHRoaXMudmlld09wdGlvbnMudmVydGljYWwgPyAndHJhbnNsYXRlWScgOiAndHJhbnNsYXRlWCc7XG5cbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdCkge1xuICAgICAgdGlja3NBcnJheS5yZXZlcnNlKCk7XG4gICAgfVxuXG4gICAgY29uc3QgdGlja1ZhbHVlU3RlcDogbnVtYmVyID0gIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMudGlja1ZhbHVlU3RlcCkgPyB0aGlzLnZpZXdPcHRpb25zLnRpY2tWYWx1ZVN0ZXAgOlxuICAgICAgICAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMudGlja1N0ZXApID8gdGhpcy52aWV3T3B0aW9ucy50aWNrU3RlcCA6IHRoaXMudmlld09wdGlvbnMuc3RlcCk7XG5cbiAgICBsZXQgaGFzQXRMZWFzdE9uZUxlZ2VuZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3QgbmV3VGlja3M6IFRpY2tbXSA9IHRpY2tzQXJyYXkubWFwKCh2YWx1ZTogbnVtYmVyKTogVGljayA9PiB7XG4gICAgICBsZXQgcG9zaXRpb246IG51bWJlciA9IHRoaXMudmFsdWVUb1Bvc2l0aW9uKHZhbHVlKTtcblxuICAgICAgaWYgKHRoaXMudmlld09wdGlvbnMudmVydGljYWwpIHtcbiAgICAgICAgcG9zaXRpb24gPSB0aGlzLm1heEhhbmRsZVBvc2l0aW9uIC0gcG9zaXRpb247XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRyYW5zbGF0aW9uOiBzdHJpbmcgPSB0cmFuc2xhdGUgKyAnKCcgKyBNYXRoLnJvdW5kKHBvc2l0aW9uKSArICdweCknO1xuICAgICAgY29uc3QgdGljazogVGljayA9IG5ldyBUaWNrKCk7XG4gICAgICB0aWNrLnNlbGVjdGVkID0gdGhpcy5pc1RpY2tTZWxlY3RlZCh2YWx1ZSk7XG4gICAgICB0aWNrLnN0eWxlID0ge1xuICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiB0cmFuc2xhdGlvbixcbiAgICAgICAgJy1tb3otdHJhbnNmb3JtJzogdHJhbnNsYXRpb24sXG4gICAgICAgICctby10cmFuc2Zvcm0nOiB0cmFuc2xhdGlvbixcbiAgICAgICAgJy1tcy10cmFuc2Zvcm0nOiB0cmFuc2xhdGlvbixcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGlvbixcbiAgICAgIH07XG4gICAgICBpZiAodGljay5zZWxlY3RlZCAmJiAhVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5nZXRTZWxlY3Rpb25CYXJDb2xvcikpIHtcbiAgICAgICAgdGljay5zdHlsZVsnYmFja2dyb3VuZC1jb2xvciddID0gdGhpcy5nZXRTZWxlY3Rpb25CYXJDb2xvcigpO1xuICAgICAgfVxuICAgICAgaWYgKCF0aWNrLnNlbGVjdGVkICYmICFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLmdldFRpY2tDb2xvcikpIHtcbiAgICAgICAgdGljay5zdHlsZVsnYmFja2dyb3VuZC1jb2xvciddID0gdGhpcy5nZXRUaWNrQ29sb3IodmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnRpY2tzVG9vbHRpcCkpIHtcbiAgICAgICAgdGljay50b29sdGlwID0gdGhpcy52aWV3T3B0aW9ucy50aWNrc1Rvb2x0aXAodmFsdWUpO1xuICAgICAgICB0aWNrLnRvb2x0aXBQbGFjZW1lbnQgPSB0aGlzLnZpZXdPcHRpb25zLnZlcnRpY2FsID8gJ3JpZ2h0JyA6ICd0b3AnO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudmlld09wdGlvbnMuc2hvd1RpY2tzVmFsdWVzICYmICFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aWNrVmFsdWVTdGVwKSAmJlxuICAgICAgICAgIE1hdGhIZWxwZXIuaXNNb2R1bG9XaXRoaW5QcmVjaXNpb25MaW1pdCh2YWx1ZSwgdGlja1ZhbHVlU3RlcCwgdGhpcy52aWV3T3B0aW9ucy5wcmVjaXNpb25MaW1pdCkpIHtcbiAgICAgICAgdGljay52YWx1ZSA9IHRoaXMuZ2V0RGlzcGxheVZhbHVlKHZhbHVlLCBMYWJlbFR5cGUuVGlja1ZhbHVlKTtcbiAgICAgICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnRpY2tzVmFsdWVzVG9vbHRpcCkpIHtcbiAgICAgICAgICB0aWNrLnZhbHVlVG9vbHRpcCA9IHRoaXMudmlld09wdGlvbnMudGlja3NWYWx1ZXNUb29sdGlwKHZhbHVlKTtcbiAgICAgICAgICB0aWNrLnZhbHVlVG9vbHRpcFBsYWNlbWVudCA9IHRoaXMudmlld09wdGlvbnMudmVydGljYWxcbiAgICAgICAgICAgID8gJ3JpZ2h0J1xuICAgICAgICAgICAgOiAndG9wJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgbGVnZW5kOiBzdHJpbmcgPSBudWxsO1xuICAgICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnN0ZXBzQXJyYXkpKSB7XG4gICAgICAgIGNvbnN0IHN0ZXA6IEN1c3RvbVN0ZXBEZWZpbml0aW9uID0gdGhpcy52aWV3T3B0aW9ucy5zdGVwc0FycmF5W3ZhbHVlXTtcbiAgICAgICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLmdldFN0ZXBMZWdlbmQpKSB7XG4gICAgICAgICAgbGVnZW5kID0gdGhpcy52aWV3T3B0aW9ucy5nZXRTdGVwTGVnZW5kKHN0ZXApO1xuICAgICAgICB9IGVsc2UgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChzdGVwKSkge1xuICAgICAgICAgIGxlZ2VuZCA9IHN0ZXAubGVnZW5kO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLmdldExlZ2VuZCkpIHtcbiAgICAgICAgbGVnZW5kID0gdGhpcy52aWV3T3B0aW9ucy5nZXRMZWdlbmQodmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChsZWdlbmQpKSB7XG4gICAgICAgIHRpY2subGVnZW5kID0gbGVnZW5kO1xuICAgICAgICBoYXNBdExlYXN0T25lTGVnZW5kID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRpY2s7XG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5zbGlkZXJFbGVtZW50V2l0aExlZ2VuZENsYXNzID0gaGFzQXRMZWFzdE9uZUxlZ2VuZDsgfSk7XG5cbiAgICAvLyBXZSBzaG91bGQgYXZvaWQgcmUtY3JlYXRpbmcgdGhlIHRpY2tzIGFycmF5IGlmIHBvc3NpYmxlXG4gICAgLy8gVGhpcyBib3RoIGltcHJvdmVzIHBlcmZvcm1hbmNlIGFuZCBtYWtlcyBDU1MgYW5pbWF0aW9ucyB3b3JrIGNvcnJlY3RseVxuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy50aWNrcykgJiYgdGhpcy50aWNrcy5sZW5ndGggPT09IG5ld1RpY2tzLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSAgPCBuZXdUaWNrcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMudGlja3NbaV0sIG5ld1RpY2tzW2ldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50aWNrcyA9IG5ld1RpY2tzO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pc1JlZkRlc3Ryb3llZCgpKSB7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRUaWNrc0FycmF5KCk6IG51bWJlcltdIHtcbiAgICBjb25zdCBzdGVwOiBudW1iZXIgPSAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMudGlja1N0ZXApKSA/IHRoaXMudmlld09wdGlvbnMudGlja1N0ZXAgOiB0aGlzLnZpZXdPcHRpb25zLnN0ZXA7XG4gICAgY29uc3QgdGlja3NBcnJheTogbnVtYmVyW10gPSBbXTtcblxuICAgIGNvbnN0IG51bWJlck9mVmFsdWVzOiBudW1iZXIgPSAxICsgTWF0aC5mbG9vcihNYXRoSGVscGVyLnJvdW5kVG9QcmVjaXNpb25MaW1pdChcbiAgICAgIE1hdGguYWJzKHRoaXMudmlld09wdGlvbnMuY2VpbCAtIHRoaXMudmlld09wdGlvbnMuZmxvb3IpIC8gc3RlcCxcbiAgICAgIHRoaXMudmlld09wdGlvbnMucHJlY2lzaW9uTGltaXRcbiAgICApKTtcbiAgICBmb3IgKGxldCBpbmRleDogbnVtYmVyID0gMDsgaW5kZXggPCBudW1iZXJPZlZhbHVlczsgKytpbmRleCkge1xuICAgICAgdGlja3NBcnJheS5wdXNoKE1hdGhIZWxwZXIucm91bmRUb1ByZWNpc2lvbkxpbWl0KHRoaXMudmlld09wdGlvbnMuZmxvb3IgKyBzdGVwICogaW5kZXgsIHRoaXMudmlld09wdGlvbnMucHJlY2lzaW9uTGltaXQpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGlja3NBcnJheTtcbiAgfVxuXG4gIHByaXZhdGUgaXNUaWNrU2VsZWN0ZWQodmFsdWU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5yYW5nZSkge1xuICAgICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnNob3dTZWxlY3Rpb25CYXJGcm9tVmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IGNlbnRlcjogbnVtYmVyID0gdGhpcy52aWV3T3B0aW9ucy5zaG93U2VsZWN0aW9uQmFyRnJvbVZhbHVlO1xuICAgICAgICBpZiAodGhpcy52aWV3TG93VmFsdWUgPiBjZW50ZXIgJiZcbiAgICAgICAgICAgIHZhbHVlID49IGNlbnRlciAmJlxuICAgICAgICAgICAgdmFsdWUgPD0gdGhpcy52aWV3TG93VmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZpZXdMb3dWYWx1ZSA8IGNlbnRlciAmJlxuICAgICAgICAgICAgICAgICAgIHZhbHVlIDw9IGNlbnRlciAmJlxuICAgICAgICAgICAgICAgICAgIHZhbHVlID49IHRoaXMudmlld0xvd1ZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy52aWV3T3B0aW9ucy5zaG93U2VsZWN0aW9uQmFyRW5kKSB7XG4gICAgICAgIGlmICh2YWx1ZSA+PSB0aGlzLnZpZXdMb3dWYWx1ZSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhciAmJiB2YWx1ZSA8PSB0aGlzLnZpZXdMb3dWYWx1ZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5yYW5nZSAmJiB2YWx1ZSA+PSB0aGlzLnZpZXdMb3dWYWx1ZSAmJiB2YWx1ZSA8PSB0aGlzLnZpZXdIaWdoVmFsdWUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSBwb3NpdGlvbiBvZiB0aGUgZmxvb3IgbGFiZWxcbiAgcHJpdmF0ZSB1cGRhdGVGbG9vckxhYmVsKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5mbG9vckxhYmVsRWxlbWVudC5hbHdheXNIaWRlKSB7XG4gICAgICB0aGlzLmZsb29yTGFiZWxFbGVtZW50LnNldFZhbHVlKHRoaXMuZ2V0RGlzcGxheVZhbHVlKHRoaXMudmlld09wdGlvbnMuZmxvb3IsIExhYmVsVHlwZS5GbG9vcikpO1xuICAgICAgdGhpcy5mbG9vckxhYmVsRWxlbWVudC5jYWxjdWxhdGVEaW1lbnNpb24oKTtcbiAgICAgIGNvbnN0IHBvc2l0aW9uOiBudW1iZXIgPSB0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0XG4gICAgICAgID8gdGhpcy5mdWxsQmFyRWxlbWVudC5kaW1lbnNpb24gLSB0aGlzLmZsb29yTGFiZWxFbGVtZW50LmRpbWVuc2lvblxuICAgICAgICA6IDA7XG4gICAgICB0aGlzLmZsb29yTGFiZWxFbGVtZW50LnNldFBvc2l0aW9uKHBvc2l0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvLyBVcGRhdGUgcG9zaXRpb24gb2YgdGhlIGNlaWxpbmcgbGFiZWxcbiAgcHJpdmF0ZSB1cGRhdGVDZWlsTGFiZWwoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNlaWxMYWJlbEVsZW1lbnQuYWx3YXlzSGlkZSkge1xuICAgICAgdGhpcy5jZWlsTGFiZWxFbGVtZW50LnNldFZhbHVlKHRoaXMuZ2V0RGlzcGxheVZhbHVlKHRoaXMudmlld09wdGlvbnMuY2VpbCwgTGFiZWxUeXBlLkNlaWwpKTtcbiAgICAgIHRoaXMuY2VpbExhYmVsRWxlbWVudC5jYWxjdWxhdGVEaW1lbnNpb24oKTtcbiAgICAgIGNvbnN0IHBvc2l0aW9uOiBudW1iZXIgPSB0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0XG4gICAgICAgID8gMFxuICAgICAgICA6IHRoaXMuZnVsbEJhckVsZW1lbnQuZGltZW5zaW9uIC0gdGhpcy5jZWlsTGFiZWxFbGVtZW50LmRpbWVuc2lvbjtcbiAgICAgIHRoaXMuY2VpbExhYmVsRWxlbWVudC5zZXRQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLy8gVXBkYXRlIHNsaWRlciBoYW5kbGVzIGFuZCBsYWJlbCBwb3NpdGlvbnNcbiAgcHJpdmF0ZSB1cGRhdGVIYW5kbGVzKHdoaWNoOiBQb2ludGVyVHlwZSwgbmV3UG9zOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAod2hpY2ggPT09IFBvaW50ZXJUeXBlLk1pbikge1xuICAgICAgdGhpcy51cGRhdGVMb3dIYW5kbGUobmV3UG9zKTtcbiAgICB9IGVsc2UgaWYgKHdoaWNoID09PSBQb2ludGVyVHlwZS5NYXgpIHtcbiAgICAgIHRoaXMudXBkYXRlSGlnaEhhbmRsZShuZXdQb3MpO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uQmFyKCk7XG4gICAgdGhpcy51cGRhdGVUaWNrc1NjYWxlKCk7XG4gICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgIHRoaXMudXBkYXRlQ29tYmluZWRMYWJlbCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbiB0byB3b3JrIG91dCB0aGUgcG9zaXRpb24gZm9yIGhhbmRsZSBsYWJlbHMgZGVwZW5kaW5nIG9uIFJUTCBvciBub3RcbiAgcHJpdmF0ZSBnZXRIYW5kbGVMYWJlbFBvcyhsYWJlbFR5cGU6IFBvaW50ZXJUeXBlLCBuZXdQb3M6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgbGFiZWxEaW1lbnNpb246IG51bWJlciA9IChsYWJlbFR5cGUgPT09IFBvaW50ZXJUeXBlLk1pbilcbiAgICAgID8gdGhpcy5taW5IYW5kbGVMYWJlbEVsZW1lbnQuZGltZW5zaW9uXG4gICAgICA6IHRoaXMubWF4SGFuZGxlTGFiZWxFbGVtZW50LmRpbWVuc2lvbjtcbiAgICBjb25zdCBuZWFySGFuZGxlUG9zOiBudW1iZXIgPSBuZXdQb3MgLSBsYWJlbERpbWVuc2lvbiAvIDIgKyB0aGlzLmhhbmRsZUhhbGZEaW1lbnNpb247XG4gICAgY29uc3QgZW5kT2ZCYXJQb3M6IG51bWJlciA9IHRoaXMuZnVsbEJhckVsZW1lbnQuZGltZW5zaW9uIC0gbGFiZWxEaW1lbnNpb247XG5cbiAgICBpZiAoIXRoaXMudmlld09wdGlvbnMuYm91bmRQb2ludGVyTGFiZWxzKSB7XG4gICAgICByZXR1cm4gbmVhckhhbmRsZVBvcztcbiAgICB9XG5cbiAgICBpZiAoKHRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnQgJiYgbGFiZWxUeXBlID09PSBQb2ludGVyVHlwZS5NaW4pIHx8XG4gICAgICAgKCF0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0ICYmIGxhYmVsVHlwZSA9PT0gUG9pbnRlclR5cGUuTWF4KSkge1xuICAgICAgcmV0dXJuIE1hdGgubWluKG5lYXJIYW5kbGVQb3MsIGVuZE9mQmFyUG9zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KG5lYXJIYW5kbGVQb3MsIDApLCBlbmRPZkJhclBvcyk7XG4gICAgfVxuICB9XG5cbiAgLy8gVXBkYXRlIGxvdyBzbGlkZXIgaGFuZGxlIHBvc2l0aW9uIGFuZCBsYWJlbFxuICBwcml2YXRlIHVwZGF0ZUxvd0hhbmRsZShuZXdQb3M6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5zZXRQb3NpdGlvbihuZXdQb3MpO1xuICAgIHRoaXMubWluSGFuZGxlTGFiZWxFbGVtZW50LnNldFZhbHVlKHRoaXMuZ2V0RGlzcGxheVZhbHVlKHRoaXMudmlld0xvd1ZhbHVlLCBMYWJlbFR5cGUuTG93KSk7XG4gICAgdGhpcy5taW5IYW5kbGVMYWJlbEVsZW1lbnQuc2V0UG9zaXRpb24odGhpcy5nZXRIYW5kbGVMYWJlbFBvcyhQb2ludGVyVHlwZS5NaW4sIG5ld1BvcykpO1xuXG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLmdldFBvaW50ZXJDb2xvcikpIHtcbiAgICAgIHRoaXMubWluUG9pbnRlclN0eWxlID0ge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuZ2V0UG9pbnRlckNvbG9yKFBvaW50ZXJUeXBlLk1pbiksXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLmF1dG9IaWRlTGltaXRMYWJlbHMpIHtcbiAgICAgIHRoaXMudXBkYXRlRmxvb3JBbmRDZWlsTGFiZWxzVmlzaWJpbGl0eSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVwZGF0ZSBoaWdoIHNsaWRlciBoYW5kbGUgcG9zaXRpb24gYW5kIGxhYmVsXG4gIHByaXZhdGUgdXBkYXRlSGlnaEhhbmRsZShuZXdQb3M6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudC5zZXRQb3NpdGlvbihuZXdQb3MpO1xuICAgIHRoaXMubWF4SGFuZGxlTGFiZWxFbGVtZW50LnNldFZhbHVlKHRoaXMuZ2V0RGlzcGxheVZhbHVlKHRoaXMudmlld0hpZ2hWYWx1ZSwgTGFiZWxUeXBlLkhpZ2gpKTtcbiAgICB0aGlzLm1heEhhbmRsZUxhYmVsRWxlbWVudC5zZXRQb3NpdGlvbih0aGlzLmdldEhhbmRsZUxhYmVsUG9zKFBvaW50ZXJUeXBlLk1heCwgbmV3UG9zKSk7XG5cbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuZ2V0UG9pbnRlckNvbG9yKSkge1xuICAgICAgdGhpcy5tYXhQb2ludGVyU3R5bGUgPSB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5nZXRQb2ludGVyQ29sb3IoUG9pbnRlclR5cGUuTWF4KSxcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLmF1dG9IaWRlTGltaXRMYWJlbHMpIHtcbiAgICAgIHRoaXMudXBkYXRlRmxvb3JBbmRDZWlsTGFiZWxzVmlzaWJpbGl0eSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNob3cvaGlkZSBmbG9vci9jZWlsaW5nIGxhYmVsXG4gIHByaXZhdGUgdXBkYXRlRmxvb3JBbmRDZWlsTGFiZWxzVmlzaWJpbGl0eSgpOiB2b2lkIHtcbiAgICAvLyBTaG93IGJhc2VkIG9ubHkgb24gaGlkZUxpbWl0TGFiZWxzIGlmIHBvaW50ZXIgbGFiZWxzIGFyZSBoaWRkZW5cbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5oaWRlUG9pbnRlckxhYmVscykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgZmxvb3JMYWJlbEhpZGRlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGxldCBjZWlsTGFiZWxIaWRkZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjb25zdCBpc01pbkxhYmVsQXRGbG9vcjogYm9vbGVhbiA9IHRoaXMuaXNMYWJlbEJlbG93Rmxvb3JMYWJlbCh0aGlzLm1pbkhhbmRsZUxhYmVsRWxlbWVudCk7XG4gICAgY29uc3QgaXNNaW5MYWJlbEF0Q2VpbDogYm9vbGVhbiA9IHRoaXMuaXNMYWJlbEFib3ZlQ2VpbExhYmVsKHRoaXMubWluSGFuZGxlTGFiZWxFbGVtZW50KTtcbiAgICBjb25zdCBpc01heExhYmVsQXRDZWlsOiBib29sZWFuID0gdGhpcy5pc0xhYmVsQWJvdmVDZWlsTGFiZWwodGhpcy5tYXhIYW5kbGVMYWJlbEVsZW1lbnQpO1xuICAgIGNvbnN0IGlzQ29tYmluZWRMYWJlbEF0Rmxvb3I6IGJvb2xlYW4gPSB0aGlzLmlzTGFiZWxCZWxvd0Zsb29yTGFiZWwodGhpcy5jb21iaW5lZExhYmVsRWxlbWVudCk7XG4gICAgY29uc3QgaXNDb21iaW5lZExhYmVsQXRDZWlsOiBib29sZWFuID0gdGhpcy5pc0xhYmVsQWJvdmVDZWlsTGFiZWwodGhpcy5jb21iaW5lZExhYmVsRWxlbWVudCk7XG5cbiAgICBpZiAoaXNNaW5MYWJlbEF0Rmxvb3IpIHtcbiAgICAgIGZsb29yTGFiZWxIaWRkZW4gPSB0cnVlO1xuICAgICAgdGhpcy5mbG9vckxhYmVsRWxlbWVudC5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZsb29yTGFiZWxIaWRkZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuZmxvb3JMYWJlbEVsZW1lbnQuc2hvdygpO1xuICAgIH1cblxuICAgIGlmIChpc01pbkxhYmVsQXRDZWlsKSB7XG4gICAgICBjZWlsTGFiZWxIaWRkZW4gPSB0cnVlO1xuICAgICAgdGhpcy5jZWlsTGFiZWxFbGVtZW50LmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2VpbExhYmVsSGlkZGVuID0gZmFsc2U7XG4gICAgICB0aGlzLmNlaWxMYWJlbEVsZW1lbnQuc2hvdygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICBjb25zdCBoaWRlQ2VpbDogYm9vbGVhbiA9IHRoaXMuY29tYmluZWRMYWJlbEVsZW1lbnQuaXNWaXNpYmxlKCkgPyBpc0NvbWJpbmVkTGFiZWxBdENlaWwgOiBpc01heExhYmVsQXRDZWlsO1xuICAgICAgY29uc3QgaGlkZUZsb29yOiBib29sZWFuID0gdGhpcy5jb21iaW5lZExhYmVsRWxlbWVudC5pc1Zpc2libGUoKSA/IGlzQ29tYmluZWRMYWJlbEF0Rmxvb3IgOiBpc01pbkxhYmVsQXRGbG9vcjtcblxuICAgICAgaWYgKGhpZGVDZWlsKSB7XG4gICAgICAgIHRoaXMuY2VpbExhYmVsRWxlbWVudC5oaWRlKCk7XG4gICAgICB9IGVsc2UgaWYgKCFjZWlsTGFiZWxIaWRkZW4pIHtcbiAgICAgICAgdGhpcy5jZWlsTGFiZWxFbGVtZW50LnNob3coKTtcbiAgICAgIH1cblxuICAgICAgLy8gSGlkZSBvciBzaG93IGZsb29yIGxhYmVsXG4gICAgICBpZiAoaGlkZUZsb29yKSB7XG4gICAgICAgIHRoaXMuZmxvb3JMYWJlbEVsZW1lbnQuaGlkZSgpO1xuICAgICAgfSBlbHNlIGlmICghZmxvb3JMYWJlbEhpZGRlbikge1xuICAgICAgICB0aGlzLmZsb29yTGFiZWxFbGVtZW50LnNob3coKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGlzTGFiZWxCZWxvd0Zsb29yTGFiZWwobGFiZWw6IFNsaWRlckxhYmVsRGlyZWN0aXZlKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcG9zOiBudW1iZXIgPSBsYWJlbC5wb3NpdGlvbjtcbiAgICBjb25zdCBkaW06IG51bWJlciA9IGxhYmVsLmRpbWVuc2lvbjtcbiAgICBjb25zdCBmbG9vclBvczogbnVtYmVyID0gdGhpcy5mbG9vckxhYmVsRWxlbWVudC5wb3NpdGlvbjtcbiAgICBjb25zdCBmbG9vckRpbTogbnVtYmVyID0gdGhpcy5mbG9vckxhYmVsRWxlbWVudC5kaW1lbnNpb247XG4gICAgcmV0dXJuIHRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnRcbiAgICAgID8gcG9zICsgZGltID49IGZsb29yUG9zIC0gMlxuICAgICAgOiBwb3MgPD0gZmxvb3JQb3MgKyBmbG9vckRpbSArIDI7XG4gIH1cblxuICBwcml2YXRlIGlzTGFiZWxBYm92ZUNlaWxMYWJlbChsYWJlbDogU2xpZGVyTGFiZWxEaXJlY3RpdmUpOiBib29sZWFuIHtcbiAgICBjb25zdCBwb3M6IG51bWJlciA9IGxhYmVsLnBvc2l0aW9uO1xuICAgIGNvbnN0IGRpbTogbnVtYmVyID0gbGFiZWwuZGltZW5zaW9uO1xuICAgIGNvbnN0IGNlaWxQb3M6IG51bWJlciA9IHRoaXMuY2VpbExhYmVsRWxlbWVudC5wb3NpdGlvbjtcbiAgICBjb25zdCBjZWlsRGltOiBudW1iZXIgPSB0aGlzLmNlaWxMYWJlbEVsZW1lbnQuZGltZW5zaW9uO1xuICAgIHJldHVybiB0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0XG4gICAgICA/IHBvcyA8PSBjZWlsUG9zICsgY2VpbERpbSArIDJcbiAgICAgIDogcG9zICsgZGltID49IGNlaWxQb3MgLSAyO1xuICB9XG5cbiAgLy8gVXBkYXRlIHNsaWRlciBzZWxlY3Rpb24gYmFyLCBjb21iaW5lZCBsYWJlbCBhbmQgcmFuZ2UgbGFiZWxcbiAgcHJpdmF0ZSB1cGRhdGVTZWxlY3Rpb25CYXIoKTogdm9pZCB7XG4gICAgbGV0IHBvc2l0aW9uOiBudW1iZXIgPSAwO1xuICAgIGxldCBkaW1lbnNpb246IG51bWJlciA9IDA7XG4gICAgY29uc3QgaXNTZWxlY3Rpb25CYXJGcm9tUmlnaHQ6IGJvb2xlYW4gPSB0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0XG4gICAgICAgID8gIXRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhckVuZFxuICAgICAgICA6IHRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhckVuZDtcbiAgICBjb25zdCBwb3NpdGlvbkZvclJhbmdlOiBudW1iZXIgPSB0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0XG4gICAgICAgID8gdGhpcy5tYXhIYW5kbGVFbGVtZW50LnBvc2l0aW9uICsgdGhpcy5oYW5kbGVIYWxmRGltZW5zaW9uXG4gICAgICAgIDogdGhpcy5taW5IYW5kbGVFbGVtZW50LnBvc2l0aW9uICsgdGhpcy5oYW5kbGVIYWxmRGltZW5zaW9uO1xuXG4gICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgIGRpbWVuc2lvbiA9IE1hdGguYWJzKHRoaXMubWF4SGFuZGxlRWxlbWVudC5wb3NpdGlvbiAtIHRoaXMubWluSGFuZGxlRWxlbWVudC5wb3NpdGlvbik7XG4gICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uRm9yUmFuZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5zaG93U2VsZWN0aW9uQmFyRnJvbVZhbHVlKSkge1xuICAgICAgICBjb25zdCBjZW50ZXI6IG51bWJlciA9IHRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhckZyb21WYWx1ZTtcbiAgICAgICAgY29uc3QgY2VudGVyUG9zaXRpb246IG51bWJlciA9IHRoaXMudmFsdWVUb1Bvc2l0aW9uKGNlbnRlcik7XG4gICAgICAgIGNvbnN0IGlzTW9kZWxHcmVhdGVyVGhhbkNlbnRlcjogYm9vbGVhbiA9IHRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnRcbiAgICAgICAgICAgID8gdGhpcy52aWV3TG93VmFsdWUgPD0gY2VudGVyXG4gICAgICAgICAgICA6IHRoaXMudmlld0xvd1ZhbHVlID4gY2VudGVyO1xuICAgICAgICBpZiAoaXNNb2RlbEdyZWF0ZXJUaGFuQ2VudGVyKSB7XG4gICAgICAgICAgZGltZW5zaW9uID0gdGhpcy5taW5IYW5kbGVFbGVtZW50LnBvc2l0aW9uIC0gY2VudGVyUG9zaXRpb247XG4gICAgICAgICAgcG9zaXRpb24gPSBjZW50ZXJQb3NpdGlvbiArIHRoaXMuaGFuZGxlSGFsZkRpbWVuc2lvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaW1lbnNpb24gPSBjZW50ZXJQb3NpdGlvbiAtIHRoaXMubWluSGFuZGxlRWxlbWVudC5wb3NpdGlvbjtcbiAgICAgICAgICBwb3NpdGlvbiA9IHRoaXMubWluSGFuZGxlRWxlbWVudC5wb3NpdGlvbiArIHRoaXMuaGFuZGxlSGFsZkRpbWVuc2lvbjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc1NlbGVjdGlvbkJhckZyb21SaWdodCkge1xuICAgICAgICBkaW1lbnNpb24gPSBNYXRoLmNlaWwoTWF0aC5hYnModGhpcy5tYXhIYW5kbGVQb3NpdGlvbiAtIHRoaXMubWluSGFuZGxlRWxlbWVudC5wb3NpdGlvbikgKyB0aGlzLmhhbmRsZUhhbGZEaW1lbnNpb24pO1xuICAgICAgICBwb3NpdGlvbiA9IE1hdGguZmxvb3IodGhpcy5taW5IYW5kbGVFbGVtZW50LnBvc2l0aW9uICsgdGhpcy5oYW5kbGVIYWxmRGltZW5zaW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpbWVuc2lvbiA9IHRoaXMubWluSGFuZGxlRWxlbWVudC5wb3NpdGlvbiArIHRoaXMuaGFuZGxlSGFsZkRpbWVuc2lvbjtcbiAgICAgICAgcG9zaXRpb24gPSAwO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNlbGVjdGlvbkJhckVsZW1lbnQuc2V0RGltZW5zaW9uKGRpbWVuc2lvbik7XG4gICAgdGhpcy5zZWxlY3Rpb25CYXJFbGVtZW50LnNldFBvc2l0aW9uKHBvc2l0aW9uKTtcbiAgICBpZiAodGhpcy5yYW5nZSAmJiB0aGlzLnZpZXdPcHRpb25zLnNob3dPdXRlclNlbGVjdGlvbkJhcnMpIHtcbiAgICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0KSB7XG4gICAgICAgIHRoaXMucmlnaHRPdXRlclNlbGVjdGlvbkJhckVsZW1lbnQuc2V0RGltZW5zaW9uKHBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5yaWdodE91dGVyU2VsZWN0aW9uQmFyRWxlbWVudC5zZXRQb3NpdGlvbigwKTtcbiAgICAgICAgdGhpcy5mdWxsQmFyRWxlbWVudC5jYWxjdWxhdGVEaW1lbnNpb24oKTtcbiAgICAgICAgdGhpcy5sZWZ0T3V0ZXJTZWxlY3Rpb25CYXJFbGVtZW50LnNldERpbWVuc2lvbih0aGlzLmZ1bGxCYXJFbGVtZW50LmRpbWVuc2lvbiAtIChwb3NpdGlvbiArIGRpbWVuc2lvbikpO1xuICAgICAgICB0aGlzLmxlZnRPdXRlclNlbGVjdGlvbkJhckVsZW1lbnQuc2V0UG9zaXRpb24ocG9zaXRpb24gKyBkaW1lbnNpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sZWZ0T3V0ZXJTZWxlY3Rpb25CYXJFbGVtZW50LnNldERpbWVuc2lvbihwb3NpdGlvbik7XG4gICAgICAgIHRoaXMubGVmdE91dGVyU2VsZWN0aW9uQmFyRWxlbWVudC5zZXRQb3NpdGlvbigwKTtcbiAgICAgICAgdGhpcy5mdWxsQmFyRWxlbWVudC5jYWxjdWxhdGVEaW1lbnNpb24oKTtcbiAgICAgICAgdGhpcy5yaWdodE91dGVyU2VsZWN0aW9uQmFyRWxlbWVudC5zZXREaW1lbnNpb24odGhpcy5mdWxsQmFyRWxlbWVudC5kaW1lbnNpb24gLSAocG9zaXRpb24gKyBkaW1lbnNpb24pKTtcbiAgICAgICAgdGhpcy5yaWdodE91dGVyU2VsZWN0aW9uQmFyRWxlbWVudC5zZXRQb3NpdGlvbihwb3NpdGlvbiArIGRpbWVuc2lvbik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5nZXRTZWxlY3Rpb25CYXJDb2xvcikpIHtcbiAgICAgIGNvbnN0IGNvbG9yOiBzdHJpbmcgPSB0aGlzLmdldFNlbGVjdGlvbkJhckNvbG9yKCk7XG4gICAgICB0aGlzLmJhclN0eWxlID0ge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLnNlbGVjdGlvbkJhckdyYWRpZW50KSkge1xuICAgICAgY29uc3Qgb2Zmc2V0OiBudW1iZXIgPSAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhckZyb21WYWx1ZSkpXG4gICAgICAgICAgICA/IHRoaXMudmFsdWVUb1Bvc2l0aW9uKHRoaXMudmlld09wdGlvbnMuc2hvd1NlbGVjdGlvbkJhckZyb21WYWx1ZSlcbiAgICAgICAgICAgIDogMDtcbiAgICAgIGNvbnN0IHJldmVyc2VkOiBib29sZWFuID0gKG9mZnNldCAtIHBvc2l0aW9uID4gMCAmJiAhaXNTZWxlY3Rpb25CYXJGcm9tUmlnaHQpIHx8IChvZmZzZXQgLSBwb3NpdGlvbiA8PSAwICYmIGlzU2VsZWN0aW9uQmFyRnJvbVJpZ2h0KTtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbjogc3RyaW5nID0gdGhpcy52aWV3T3B0aW9ucy52ZXJ0aWNhbFxuICAgICAgICAgID8gcmV2ZXJzZWQgPyAnYm90dG9tJyA6ICd0b3AnXG4gICAgICAgICAgOiByZXZlcnNlZCA/ICdsZWZ0JyA6ICdyaWdodCc7XG4gICAgICB0aGlzLmJhclN0eWxlID0ge1xuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6XG4gICAgICAgICAgJ2xpbmVhci1ncmFkaWVudCh0byAnICtcbiAgICAgICAgICBkaXJlY3Rpb24gK1xuICAgICAgICAgICcsICcgK1xuICAgICAgICAgIHRoaXMudmlld09wdGlvbnMuc2VsZWN0aW9uQmFyR3JhZGllbnQuZnJvbSArXG4gICAgICAgICAgJyAwJSwnICtcbiAgICAgICAgICB0aGlzLnZpZXdPcHRpb25zLnNlbGVjdGlvbkJhckdyYWRpZW50LnRvICtcbiAgICAgICAgICAnIDEwMCUpJyxcbiAgICAgIH07XG4gICAgICBpZiAodGhpcy52aWV3T3B0aW9ucy52ZXJ0aWNhbCkge1xuICAgICAgICB0aGlzLmJhclN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9XG4gICAgICAgICAgJ2NlbnRlciAnICtcbiAgICAgICAgICAob2Zmc2V0ICtcbiAgICAgICAgICAgIGRpbWVuc2lvbiArXG4gICAgICAgICAgICBwb3NpdGlvbiArXG4gICAgICAgICAgICAocmV2ZXJzZWQgPyAtdGhpcy5oYW5kbGVIYWxmRGltZW5zaW9uIDogMCkpICtcbiAgICAgICAgICAncHgnO1xuICAgICAgICB0aGlzLmJhclN0eWxlLmJhY2tncm91bmRTaXplID1cbiAgICAgICAgICAnMTAwJSAnICsgKHRoaXMuZnVsbEJhckVsZW1lbnQuZGltZW5zaW9uIC0gdGhpcy5oYW5kbGVIYWxmRGltZW5zaW9uKSArICdweCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmJhclN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9XG4gICAgICAgICAgb2Zmc2V0IC1cbiAgICAgICAgICBwb3NpdGlvbiArXG4gICAgICAgICAgKHJldmVyc2VkID8gdGhpcy5oYW5kbGVIYWxmRGltZW5zaW9uIDogMCkgK1xuICAgICAgICAgICdweCBjZW50ZXInO1xuICAgICAgICB0aGlzLmJhclN0eWxlLmJhY2tncm91bmRTaXplID1cbiAgICAgICAgICB0aGlzLmZ1bGxCYXJFbGVtZW50LmRpbWVuc2lvbiAtIHRoaXMuaGFuZGxlSGFsZkRpbWVuc2lvbiArICdweCAxMDAlJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBXcmFwcGVyIGFyb3VuZCB0aGUgZ2V0U2VsZWN0aW9uQmFyQ29sb3Igb2YgdGhlIHVzZXIgdG8gcGFzcyB0byBjb3JyZWN0IHBhcmFtZXRlcnNcbiAgcHJpdmF0ZSBnZXRTZWxlY3Rpb25CYXJDb2xvcigpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICByZXR1cm4gdGhpcy52aWV3T3B0aW9ucy5nZXRTZWxlY3Rpb25CYXJDb2xvcihcbiAgICAgICAgdGhpcy52YWx1ZSxcbiAgICAgICAgdGhpcy5oaWdoVmFsdWVcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnZpZXdPcHRpb25zLmdldFNlbGVjdGlvbkJhckNvbG9yKHRoaXMudmFsdWUpO1xuICB9XG5cbiAgLy8gV3JhcHBlciBhcm91bmQgdGhlIGdldFBvaW50ZXJDb2xvciBvZiB0aGUgdXNlciB0byBwYXNzIHRvICBjb3JyZWN0IHBhcmFtZXRlcnNcbiAgcHJpdmF0ZSBnZXRQb2ludGVyQ29sb3IocG9pbnRlclR5cGU6IFBvaW50ZXJUeXBlKTogc3RyaW5nIHtcbiAgICBpZiAocG9pbnRlclR5cGUgPT09IFBvaW50ZXJUeXBlLk1heCkge1xuICAgICAgcmV0dXJuIHRoaXMudmlld09wdGlvbnMuZ2V0UG9pbnRlckNvbG9yKFxuICAgICAgICB0aGlzLmhpZ2hWYWx1ZSxcbiAgICAgICAgcG9pbnRlclR5cGVcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnZpZXdPcHRpb25zLmdldFBvaW50ZXJDb2xvcihcbiAgICAgIHRoaXMudmFsdWUsXG4gICAgICBwb2ludGVyVHlwZVxuICAgICk7XG4gIH1cblxuICAvLyBXcmFwcGVyIGFyb3VuZCB0aGUgZ2V0VGlja0NvbG9yIG9mIHRoZSB1c2VyIHRvIHBhc3MgdG8gY29ycmVjdCBwYXJhbWV0ZXJzXG4gIHByaXZhdGUgZ2V0VGlja0NvbG9yKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnZpZXdPcHRpb25zLmdldFRpY2tDb2xvcih2YWx1ZSk7XG4gIH1cblxuICAvLyBVcGRhdGUgY29tYmluZWQgbGFiZWwgcG9zaXRpb24gYW5kIHZhbHVlXG4gIHByaXZhdGUgdXBkYXRlQ29tYmluZWRMYWJlbCgpOiB2b2lkIHtcbiAgICBsZXQgaXNMYWJlbE92ZXJsYXA6IGJvb2xlYW4gPSBudWxsO1xuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0KSB7XG4gICAgICBpc0xhYmVsT3ZlcmxhcCA9XG4gICAgICAgIHRoaXMubWluSGFuZGxlTGFiZWxFbGVtZW50LnBvc2l0aW9uIC0gdGhpcy5taW5IYW5kbGVMYWJlbEVsZW1lbnQuZGltZW5zaW9uIC0gMTAgPD0gdGhpcy5tYXhIYW5kbGVMYWJlbEVsZW1lbnQucG9zaXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIGlzTGFiZWxPdmVybGFwID1cbiAgICAgICAgdGhpcy5taW5IYW5kbGVMYWJlbEVsZW1lbnQucG9zaXRpb24gKyB0aGlzLm1pbkhhbmRsZUxhYmVsRWxlbWVudC5kaW1lbnNpb24gKyAxMCA+PSB0aGlzLm1heEhhbmRsZUxhYmVsRWxlbWVudC5wb3NpdGlvbjtcbiAgICB9XG5cbiAgICBpZiAoaXNMYWJlbE92ZXJsYXApIHtcbiAgICAgIGNvbnN0IGxvd0Rpc3BsYXlWYWx1ZTogc3RyaW5nID0gdGhpcy5nZXREaXNwbGF5VmFsdWUodGhpcy52aWV3TG93VmFsdWUsIExhYmVsVHlwZS5Mb3cpO1xuICAgICAgY29uc3QgaGlnaERpc3BsYXlWYWx1ZTogc3RyaW5nID0gdGhpcy5nZXREaXNwbGF5VmFsdWUodGhpcy52aWV3SGlnaFZhbHVlLCBMYWJlbFR5cGUuSGlnaCk7XG4gICAgICBjb25zdCBjb21iaW5lZExhYmVsVmFsdWU6IHN0cmluZyA9IHRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnRcbiAgICAgICAgPyB0aGlzLnZpZXdPcHRpb25zLmNvbWJpbmVMYWJlbHMoaGlnaERpc3BsYXlWYWx1ZSwgbG93RGlzcGxheVZhbHVlKVxuICAgICAgICA6IHRoaXMudmlld09wdGlvbnMuY29tYmluZUxhYmVscyhsb3dEaXNwbGF5VmFsdWUsIGhpZ2hEaXNwbGF5VmFsdWUpO1xuXG4gICAgICB0aGlzLmNvbWJpbmVkTGFiZWxFbGVtZW50LnNldFZhbHVlKGNvbWJpbmVkTGFiZWxWYWx1ZSk7XG4gICAgICBjb25zdCBwb3M6IG51bWJlciA9IHRoaXMudmlld09wdGlvbnMuYm91bmRQb2ludGVyTGFiZWxzXG4gICAgICAgID8gTWF0aC5taW4oXG4gICAgICAgICAgICBNYXRoLm1heChcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25CYXJFbGVtZW50LnBvc2l0aW9uICtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkJhckVsZW1lbnQuZGltZW5zaW9uIC8gMiAtXG4gICAgICAgICAgICAgICAgdGhpcy5jb21iaW5lZExhYmVsRWxlbWVudC5kaW1lbnNpb24gLyAyLFxuICAgICAgICAgICAgICAwXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgdGhpcy5mdWxsQmFyRWxlbWVudC5kaW1lbnNpb24gLSB0aGlzLmNvbWJpbmVkTGFiZWxFbGVtZW50LmRpbWVuc2lvblxuICAgICAgICAgIClcbiAgICAgICAgOiB0aGlzLnNlbGVjdGlvbkJhckVsZW1lbnQucG9zaXRpb24gKyB0aGlzLnNlbGVjdGlvbkJhckVsZW1lbnQuZGltZW5zaW9uIC8gMiAtIHRoaXMuY29tYmluZWRMYWJlbEVsZW1lbnQuZGltZW5zaW9uIC8gMjtcblxuICAgICAgdGhpcy5jb21iaW5lZExhYmVsRWxlbWVudC5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgdGhpcy5taW5IYW5kbGVMYWJlbEVsZW1lbnQuaGlkZSgpO1xuICAgICAgdGhpcy5tYXhIYW5kbGVMYWJlbEVsZW1lbnQuaGlkZSgpO1xuICAgICAgdGhpcy5jb21iaW5lZExhYmVsRWxlbWVudC5zaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXBkYXRlSGlnaEhhbmRsZSh0aGlzLnZhbHVlVG9Qb3NpdGlvbih0aGlzLnZpZXdIaWdoVmFsdWUpKTtcbiAgICAgIHRoaXMudXBkYXRlTG93SGFuZGxlKHRoaXMudmFsdWVUb1Bvc2l0aW9uKHRoaXMudmlld0xvd1ZhbHVlKSk7XG4gICAgICB0aGlzLm1heEhhbmRsZUxhYmVsRWxlbWVudC5zaG93KCk7XG4gICAgICB0aGlzLm1pbkhhbmRsZUxhYmVsRWxlbWVudC5zaG93KCk7XG4gICAgICB0aGlzLmNvbWJpbmVkTGFiZWxFbGVtZW50LmhpZGUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMuYXV0b0hpZGVMaW1pdExhYmVscykge1xuICAgICAgdGhpcy51cGRhdGVGbG9vckFuZENlaWxMYWJlbHNWaXNpYmlsaXR5KCk7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJuIHRoZSB0cmFuc2xhdGVkIHZhbHVlIGlmIGEgdHJhbnNsYXRlIGZ1bmN0aW9uIGlzIHByb3ZpZGVkIGVsc2UgdGhlIG9yaWdpbmFsIHZhbHVlXG4gIHByaXZhdGUgZ2V0RGlzcGxheVZhbHVlKHZhbHVlOiBudW1iZXIsIHdoaWNoOiBMYWJlbFR5cGUpOiBzdHJpbmcge1xuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5zdGVwc0FycmF5KSAmJiAhdGhpcy52aWV3T3B0aW9ucy5iaW5kSW5kZXhGb3JTdGVwc0FycmF5KSB7XG4gICAgICB2YWx1ZSA9IHRoaXMuZ2V0U3RlcFZhbHVlKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudmlld09wdGlvbnMudHJhbnNsYXRlKHZhbHVlLCB3aGljaCk7XG4gIH1cblxuICAvLyBSb3VuZCB2YWx1ZSB0byBzdGVwIGFuZCBwcmVjaXNpb24gYmFzZWQgb24gbWluVmFsdWVcbiAgcHJpdmF0ZSByb3VuZFN0ZXAodmFsdWU6IG51bWJlciwgY3VzdG9tU3RlcD86IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3Qgc3RlcDogbnVtYmVyID0gIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKGN1c3RvbVN0ZXApID8gY3VzdG9tU3RlcCA6IHRoaXMudmlld09wdGlvbnMuc3RlcDtcbiAgICBsZXQgc3RlcHBlZERpZmZlcmVuY2U6IG51bWJlciA9IE1hdGhIZWxwZXIucm91bmRUb1ByZWNpc2lvbkxpbWl0KFxuICAgICAgKHZhbHVlIC0gdGhpcy52aWV3T3B0aW9ucy5mbG9vcikgLyBzdGVwLCB0aGlzLnZpZXdPcHRpb25zLnByZWNpc2lvbkxpbWl0KTtcbiAgICBzdGVwcGVkRGlmZmVyZW5jZSA9IE1hdGgucm91bmQoc3RlcHBlZERpZmZlcmVuY2UpICogc3RlcDtcbiAgICByZXR1cm4gTWF0aEhlbHBlci5yb3VuZFRvUHJlY2lzaW9uTGltaXQodGhpcy52aWV3T3B0aW9ucy5mbG9vciArIHN0ZXBwZWREaWZmZXJlbmNlLCB0aGlzLnZpZXdPcHRpb25zLnByZWNpc2lvbkxpbWl0KTtcbiAgfVxuXG4gIC8vIFRyYW5zbGF0ZSB2YWx1ZSB0byBwaXhlbCBwb3NpdGlvblxuICBwcml2YXRlIHZhbHVlVG9Qb3NpdGlvbih2YWw6IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IGZuOiBWYWx1ZVRvUG9zaXRpb25GdW5jdGlvbiAgPSBWYWx1ZUhlbHBlci5saW5lYXJWYWx1ZVRvUG9zaXRpb247XG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLmN1c3RvbVZhbHVlVG9Qb3NpdGlvbikpIHtcbiAgICAgIGZuID0gdGhpcy52aWV3T3B0aW9ucy5jdXN0b21WYWx1ZVRvUG9zaXRpb247XG4gICAgfSBlbHNlIGlmICh0aGlzLnZpZXdPcHRpb25zLmxvZ1NjYWxlKSB7XG4gICAgICBmbiA9IFZhbHVlSGVscGVyLmxvZ1ZhbHVlVG9Qb3NpdGlvbjtcbiAgICB9XG5cbiAgICB2YWwgPSBNYXRoSGVscGVyLmNsYW1wVG9SYW5nZSh2YWwsIHRoaXMudmlld09wdGlvbnMuZmxvb3IsIHRoaXMudmlld09wdGlvbnMuY2VpbCk7XG4gICAgbGV0IHBlcmNlbnQ6IG51bWJlciA9IGZuKHZhbCwgdGhpcy52aWV3T3B0aW9ucy5mbG9vciwgdGhpcy52aWV3T3B0aW9ucy5jZWlsKTtcbiAgICBpZiAoVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQocGVyY2VudCkpIHtcbiAgICAgIHBlcmNlbnQgPSAwO1xuICAgIH1cbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdCkge1xuICAgICAgcGVyY2VudCA9IDEgLSBwZXJjZW50O1xuICAgIH1cbiAgICByZXR1cm4gcGVyY2VudCAqIHRoaXMubWF4SGFuZGxlUG9zaXRpb247XG4gIH1cblxuICAvLyBUcmFuc2xhdGUgcG9zaXRpb24gdG8gbW9kZWwgdmFsdWVcbiAgcHJpdmF0ZSBwb3NpdGlvblRvVmFsdWUocG9zaXRpb246IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IHBlcmNlbnQ6IG51bWJlciA9IHBvc2l0aW9uIC8gdGhpcy5tYXhIYW5kbGVQb3NpdGlvbjtcbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdCkge1xuICAgICAgcGVyY2VudCA9IDEgLSBwZXJjZW50O1xuICAgIH1cbiAgICBsZXQgZm46IFBvc2l0aW9uVG9WYWx1ZUZ1bmN0aW9uID0gVmFsdWVIZWxwZXIubGluZWFyUG9zaXRpb25Ub1ZhbHVlO1xuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5jdXN0b21Qb3NpdGlvblRvVmFsdWUpKSB7XG4gICAgICBmbiA9IHRoaXMudmlld09wdGlvbnMuY3VzdG9tUG9zaXRpb25Ub1ZhbHVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy52aWV3T3B0aW9ucy5sb2dTY2FsZSkge1xuICAgICAgZm4gPSBWYWx1ZUhlbHBlci5sb2dQb3NpdGlvblRvVmFsdWU7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlOiBudW1iZXIgPSBmbihwZXJjZW50LCB0aGlzLnZpZXdPcHRpb25zLmZsb29yLCB0aGlzLnZpZXdPcHRpb25zLmNlaWwpO1xuICAgIHJldHVybiAhVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodmFsdWUpID8gdmFsdWUgOiAwO1xuICB9XG5cbiAgLy8gR2V0IHRoZSBYLWNvb3JkaW5hdGUgb3IgWS1jb29yZGluYXRlIG9mIGFuIGV2ZW50XG4gIHByaXZhdGUgZ2V0RXZlbnRYWShldmVudDogTW91c2VFdmVudHxUb3VjaEV2ZW50LCB0YXJnZXRUb3VjaElkPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy52aWV3T3B0aW9ucy52ZXJ0aWNhbCA/IGV2ZW50LmNsaWVudFkgOiBldmVudC5jbGllbnRYO1xuICAgIH1cblxuICAgIGxldCB0b3VjaEluZGV4OiBudW1iZXIgPSAwO1xuICAgIGNvbnN0IHRvdWNoZXM6IFRvdWNoTGlzdCA9IGV2ZW50LnRvdWNoZXM7XG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0YXJnZXRUb3VjaElkKSkge1xuICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRvdWNoZXNbaV0uaWRlbnRpZmllciA9PT0gdGFyZ2V0VG91Y2hJZCkge1xuICAgICAgICAgIHRvdWNoSW5kZXggPSBpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIHRoZSB0YXJnZXQgdG91Y2ggb3IgaWYgdGhlIHRhcmdldCB0b3VjaCB3YXMgbm90IGZvdW5kIGluIHRoZSBldmVudFxuICAgIC8vIHJldHVybnMgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBmaXJzdCB0b3VjaFxuICAgIHJldHVybiB0aGlzLnZpZXdPcHRpb25zLnZlcnRpY2FsID8gdG91Y2hlc1t0b3VjaEluZGV4XS5jbGllbnRZIDogdG91Y2hlc1t0b3VjaEluZGV4XS5jbGllbnRYO1xuICB9XG5cbiAgLy8gQ29tcHV0ZSB0aGUgZXZlbnQgcG9zaXRpb24gZGVwZW5kaW5nIG9uIHdoZXRoZXIgdGhlIHNsaWRlciBpcyBob3Jpem9udGFsIG9yIHZlcnRpY2FsXG4gIHByaXZhdGUgZ2V0RXZlbnRQb3NpdGlvbihldmVudDogTW91c2VFdmVudHxUb3VjaEV2ZW50LCB0YXJnZXRUb3VjaElkPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBzbGlkZXJFbGVtZW50Qm91bmRpbmdSZWN0OiBDbGllbnRSZWN0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBjb25zdCBzbGlkZXJQb3M6IG51bWJlciA9IHRoaXMudmlld09wdGlvbnMudmVydGljYWwgP1xuICAgICAgc2xpZGVyRWxlbWVudEJvdW5kaW5nUmVjdC5ib3R0b20gOiBzbGlkZXJFbGVtZW50Qm91bmRpbmdSZWN0LmxlZnQ7XG4gICAgbGV0IGV2ZW50UG9zOiBudW1iZXIgPSAwO1xuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLnZlcnRpY2FsKSB7XG4gICAgICBldmVudFBvcyA9IC10aGlzLmdldEV2ZW50WFkoZXZlbnQsIHRhcmdldFRvdWNoSWQpICsgc2xpZGVyUG9zO1xuICAgIH0gZWxzZSB7XG4gICAgICBldmVudFBvcyA9IHRoaXMuZ2V0RXZlbnRYWShldmVudCwgdGFyZ2V0VG91Y2hJZCkgLSBzbGlkZXJQb3M7XG4gICAgfVxuICAgIHJldHVybiBldmVudFBvcyAqIHRoaXMudmlld09wdGlvbnMuc2NhbGUgLSB0aGlzLmhhbmRsZUhhbGZEaW1lbnNpb247XG4gIH1cblxuICAvLyBHZXQgdGhlIGhhbmRsZSBjbG9zZXN0IHRvIGFuIGV2ZW50XG4gIHByaXZhdGUgZ2V0TmVhcmVzdEhhbmRsZShldmVudDogTW91c2VFdmVudHxUb3VjaEV2ZW50KTogUG9pbnRlclR5cGUge1xuICAgIGlmICghdGhpcy5yYW5nZSkge1xuICAgICAgcmV0dXJuIFBvaW50ZXJUeXBlLk1pbjtcbiAgICB9XG5cbiAgICBjb25zdCBwb3NpdGlvbjogbnVtYmVyID0gdGhpcy5nZXRFdmVudFBvc2l0aW9uKGV2ZW50KTtcbiAgICBjb25zdCBkaXN0YW5jZU1pbjogbnVtYmVyID0gTWF0aC5hYnMocG9zaXRpb24gLSB0aGlzLm1pbkhhbmRsZUVsZW1lbnQucG9zaXRpb24pO1xuICAgIGNvbnN0IGRpc3RhbmNlTWF4OiBudW1iZXIgPSBNYXRoLmFicyhwb3NpdGlvbiAtIHRoaXMubWF4SGFuZGxlRWxlbWVudC5wb3NpdGlvbik7XG5cbiAgICBpZiAoZGlzdGFuY2VNaW4gPCBkaXN0YW5jZU1heCkge1xuICAgICAgcmV0dXJuIFBvaW50ZXJUeXBlLk1pbjtcbiAgICB9IGVsc2UgaWYgKGRpc3RhbmNlTWluID4gZGlzdGFuY2VNYXgpIHtcbiAgICAgIHJldHVybiBQb2ludGVyVHlwZS5NYXg7XG4gICAgfSBlbHNlIGlmICghdGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdCkge1xuICAgICAgLy8gaWYgZXZlbnQgaXMgYXQgdGhlIHNhbWUgZGlzdGFuY2UgZnJvbSBtaW4vbWF4IHRoZW4gaWYgaXQncyBhdCBsZWZ0IG9mIG1pbkgsIHdlIHJldHVybiBtaW5IIGVsc2UgbWF4SFxuICAgICAgcmV0dXJuIHBvc2l0aW9uIDwgdGhpcy5taW5IYW5kbGVFbGVtZW50LnBvc2l0aW9uID8gUG9pbnRlclR5cGUuTWluIDogUG9pbnRlclR5cGUuTWF4O1xuICAgIH1cbiAgICAvLyByZXZlcnNlIGluIHJ0bFxuICAgIHJldHVybiBwb3NpdGlvbiA+IHRoaXMubWluSGFuZGxlRWxlbWVudC5wb3NpdGlvbiA/IFBvaW50ZXJUeXBlLk1pbiA6IFBvaW50ZXJUeXBlLk1heDtcbiAgfVxuXG4gIC8vIEJpbmQgbW91c2UgYW5kIHRvdWNoIGV2ZW50cyB0byBzbGlkZXIgaGFuZGxlc1xuICBwcml2YXRlIGJpbmRFdmVudHMoKTogdm9pZCB7XG4gICAgY29uc3QgZHJhZ2dhYmxlUmFuZ2U6IGJvb2xlYW4gPSB0aGlzLnZpZXdPcHRpb25zLmRyYWdnYWJsZVJhbmdlO1xuXG4gICAgaWYgKCF0aGlzLnZpZXdPcHRpb25zLm9ubHlCaW5kSGFuZGxlcykge1xuICAgICAgdGhpcy5zZWxlY3Rpb25CYXJFbGVtZW50Lm9uKCdtb3VzZWRvd24nLFxuICAgICAgICAoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHRoaXMub25CYXJTdGFydChudWxsLCBkcmFnZ2FibGVSYW5nZSwgZXZlbnQsIHRydWUsIHRydWUsIHRydWUpXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLmRyYWdnYWJsZVJhbmdlT25seSkge1xuICAgICAgdGhpcy5taW5IYW5kbGVFbGVtZW50Lm9uKCdtb3VzZWRvd24nLFxuICAgICAgICAoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHRoaXMub25CYXJTdGFydChQb2ludGVyVHlwZS5NaW4sIGRyYWdnYWJsZVJhbmdlLCBldmVudCwgdHJ1ZSwgdHJ1ZSlcbiAgICAgICk7XG4gICAgICB0aGlzLm1heEhhbmRsZUVsZW1lbnQub24oJ21vdXNlZG93bicsXG4gICAgICAgIChldmVudDogTW91c2VFdmVudCk6IHZvaWQgPT4gdGhpcy5vbkJhclN0YXJ0KFBvaW50ZXJUeXBlLk1heCwgZHJhZ2dhYmxlUmFuZ2UsIGV2ZW50LCB0cnVlLCB0cnVlKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5taW5IYW5kbGVFbGVtZW50Lm9uKCdtb3VzZWRvd24nLFxuICAgICAgICAoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHRoaXMub25TdGFydChQb2ludGVyVHlwZS5NaW4sIGV2ZW50LCB0cnVlLCB0cnVlKVxuICAgICAgKTtcblxuICAgICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50Lm9uKCdtb3VzZWRvd24nLFxuICAgICAgICAgIChldmVudDogTW91c2VFdmVudCk6IHZvaWQgPT4gdGhpcy5vblN0YXJ0KFBvaW50ZXJUeXBlLk1heCwgZXZlbnQsIHRydWUsIHRydWUpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMudmlld09wdGlvbnMub25seUJpbmRIYW5kbGVzKSB7XG4gICAgICAgIHRoaXMuZnVsbEJhckVsZW1lbnQub24oJ21vdXNlZG93bicsXG4gICAgICAgICAgKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCA9PiB0aGlzLm9uU3RhcnQobnVsbCwgZXZlbnQsIHRydWUsIHRydWUsIHRydWUpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMudGlja3NFbGVtZW50Lm9uKCdtb3VzZWRvd24nLFxuICAgICAgICAgIChldmVudDogTW91c2VFdmVudCk6IHZvaWQgPT4gdGhpcy5vblN0YXJ0KG51bGwsIGV2ZW50LCB0cnVlLCB0cnVlLCB0cnVlLCB0cnVlKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdGhpcy52aWV3T3B0aW9ucy5vbmx5QmluZEhhbmRsZXMpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uQmFyRWxlbWVudC5vblBhc3NpdmUoJ3RvdWNoc3RhcnQnLFxuICAgICAgICAoZXZlbnQ6IFRvdWNoRXZlbnQpOiB2b2lkID0+IHRoaXMub25CYXJTdGFydChudWxsLCBkcmFnZ2FibGVSYW5nZSwgZXZlbnQsIHRydWUsIHRydWUsIHRydWUpXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5kcmFnZ2FibGVSYW5nZU9ubHkpIHtcbiAgICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5vblBhc3NpdmUoJ3RvdWNoc3RhcnQnLFxuICAgICAgICAoZXZlbnQ6IFRvdWNoRXZlbnQpOiB2b2lkID0+IHRoaXMub25CYXJTdGFydChQb2ludGVyVHlwZS5NaW4sIGRyYWdnYWJsZVJhbmdlLCBldmVudCwgdHJ1ZSwgdHJ1ZSlcbiAgICAgICk7XG4gICAgICB0aGlzLm1heEhhbmRsZUVsZW1lbnQub25QYXNzaXZlKCd0b3VjaHN0YXJ0JyxcbiAgICAgICAgKGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCA9PiB0aGlzLm9uQmFyU3RhcnQoUG9pbnRlclR5cGUuTWF4LCBkcmFnZ2FibGVSYW5nZSwgZXZlbnQsIHRydWUsIHRydWUpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQub25QYXNzaXZlKCd0b3VjaHN0YXJ0JyxcbiAgICAgICAgKGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCA9PiB0aGlzLm9uU3RhcnQoUG9pbnRlclR5cGUuTWluLCBldmVudCwgdHJ1ZSwgdHJ1ZSlcbiAgICAgICk7XG4gICAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgICB0aGlzLm1heEhhbmRsZUVsZW1lbnQub25QYXNzaXZlKCd0b3VjaHN0YXJ0JyxcbiAgICAgICAgICAoZXZlbnQ6IFRvdWNoRXZlbnQpOiB2b2lkID0+IHRoaXMub25TdGFydChQb2ludGVyVHlwZS5NYXgsIGV2ZW50LCB0cnVlLCB0cnVlKVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLnZpZXdPcHRpb25zLm9ubHlCaW5kSGFuZGxlcykge1xuICAgICAgICB0aGlzLmZ1bGxCYXJFbGVtZW50Lm9uUGFzc2l2ZSgndG91Y2hzdGFydCcsXG4gICAgICAgICAgKGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCA9PiB0aGlzLm9uU3RhcnQobnVsbCwgZXZlbnQsIHRydWUsIHRydWUsIHRydWUpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMudGlja3NFbGVtZW50Lm9uUGFzc2l2ZSgndG91Y2hzdGFydCcsXG4gICAgICAgICAgKGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCA9PiB0aGlzLm9uU3RhcnQobnVsbCwgZXZlbnQsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgdHJ1ZSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5rZXlib2FyZFN1cHBvcnQpIHtcbiAgICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5vbignZm9jdXMnLCAoKTogdm9pZCA9PiB0aGlzLm9uUG9pbnRlckZvY3VzKFBvaW50ZXJUeXBlLk1pbikpO1xuICAgICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgICAgdGhpcy5tYXhIYW5kbGVFbGVtZW50Lm9uKCdmb2N1cycsICgpOiB2b2lkID0+IHRoaXMub25Qb2ludGVyRm9jdXMoUG9pbnRlclR5cGUuTWF4KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRPcHRpb25zSW5mbHVlbmNpbmdFdmVudEJpbmRpbmdzKG9wdGlvbnM6IE9wdGlvbnMpOiBib29sZWFuW10ge1xuICAgIHJldHVybiBbXG4gICAgICBvcHRpb25zLmRpc2FibGVkLFxuICAgICAgb3B0aW9ucy5yZWFkT25seSxcbiAgICAgIG9wdGlvbnMuZHJhZ2dhYmxlUmFuZ2UsXG4gICAgICBvcHRpb25zLmRyYWdnYWJsZVJhbmdlT25seSxcbiAgICAgIG9wdGlvbnMub25seUJpbmRIYW5kbGVzLFxuICAgICAgb3B0aW9ucy5rZXlib2FyZFN1cHBvcnRcbiAgICBdO1xuICB9XG5cbiAgLy8gVW5iaW5kIG1vdXNlIGFuZCB0b3VjaCBldmVudHMgdG8gc2xpZGVyIGhhbmRsZXNcbiAgcHJpdmF0ZSB1bmJpbmRFdmVudHMoKTogdm9pZCB7XG4gICAgdGhpcy51bnN1YnNjcmliZU9uTW92ZSgpO1xuICAgIHRoaXMudW5zdWJzY3JpYmVPbkVuZCgpO1xuXG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHRoaXMuZ2V0QWxsU2xpZGVyRWxlbWVudHMoKSkge1xuICAgICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChlbGVtZW50KSkge1xuICAgICAgICBlbGVtZW50Lm9mZigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25CYXJTdGFydChwb2ludGVyVHlwZTogUG9pbnRlclR5cGUsIGRyYWdnYWJsZVJhbmdlOiBib29sZWFuLCBldmVudDogTW91c2VFdmVudHxUb3VjaEV2ZW50LFxuICAgIGJpbmRNb3ZlOiBib29sZWFuLCBiaW5kRW5kOiBib29sZWFuLCBzaW11bGF0ZUltbWVkaWF0ZU1vdmU/OiBib29sZWFuLCBzaW11bGF0ZUltbWVkaWF0ZUVuZD86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoZHJhZ2dhYmxlUmFuZ2UpIHtcbiAgICAgIHRoaXMub25EcmFnU3RhcnQocG9pbnRlclR5cGUsIGV2ZW50LCBiaW5kTW92ZSwgYmluZEVuZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25TdGFydChwb2ludGVyVHlwZSwgZXZlbnQsIGJpbmRNb3ZlLCBiaW5kRW5kLCBzaW11bGF0ZUltbWVkaWF0ZU1vdmUsIHNpbXVsYXRlSW1tZWRpYXRlRW5kKTtcbiAgICB9XG4gIH1cblxuICAvLyBvblN0YXJ0IGV2ZW50IGhhbmRsZXJcbiAgcHJpdmF0ZSBvblN0YXJ0KHBvaW50ZXJUeXBlOiBQb2ludGVyVHlwZSwgZXZlbnQ6IE1vdXNlRXZlbnR8VG91Y2hFdmVudCxcbiAgICAgIGJpbmRNb3ZlOiBib29sZWFuLCBiaW5kRW5kOiBib29sZWFuLCBzaW11bGF0ZUltbWVkaWF0ZU1vdmU/OiBib29sZWFuLCBzaW11bGF0ZUltbWVkaWF0ZUVuZD86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAvLyBPbmx5IGNhbGwgcHJldmVudERlZmF1bHQoKSB3aGVuIGhhbmRsaW5nIG5vbi1wYXNzaXZlIGV2ZW50cyAocGFzc2l2ZSBldmVudHMgZG9uJ3QgbmVlZCBpdClcbiAgICBpZiAoIUNvbXBhdGliaWxpdHlIZWxwZXIuaXNUb3VjaEV2ZW50KGV2ZW50KSB8fCAhZGV0ZWN0UGFzc2l2ZUV2ZW50cy5oYXNTdXBwb3J0KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG5cbiAgICAvLyBXZSBoYXZlIHRvIGRvIHRoaXMgaW4gY2FzZSB0aGUgSFRNTCB3aGVyZSB0aGUgc2xpZGVycyBhcmUgb25cbiAgICAvLyBoYXZlIGJlZW4gYW5pbWF0ZWQgaW50byB2aWV3LlxuICAgIHRoaXMuY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMoKTtcblxuICAgIGlmIChWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChwb2ludGVyVHlwZSkpIHtcbiAgICAgIHBvaW50ZXJUeXBlID0gdGhpcy5nZXROZWFyZXN0SGFuZGxlKGV2ZW50KTtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXIgPSBwb2ludGVyVHlwZTtcblxuICAgIGNvbnN0IHBvaW50ZXJFbGVtZW50OiBTbGlkZXJIYW5kbGVEaXJlY3RpdmUgPSB0aGlzLmdldFBvaW50ZXJFbGVtZW50KHBvaW50ZXJUeXBlKTtcbiAgICBwb2ludGVyRWxlbWVudC5hY3RpdmUgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMua2V5Ym9hcmRTdXBwb3J0KSB7XG4gICAgICBwb2ludGVyRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGlmIChiaW5kTW92ZSkge1xuICAgICAgdGhpcy51bnN1YnNjcmliZU9uTW92ZSgpO1xuXG4gICAgICBjb25zdCBvbk1vdmVDYWxsYmFjazogKChlOiBNb3VzZUV2ZW50fFRvdWNoRXZlbnQpID0+IHZvaWQpID1cbiAgICAgICAgKGU6IE1vdXNlRXZlbnR8VG91Y2hFdmVudCk6IHZvaWQgPT4gdGhpcy5kcmFnZ2luZy5hY3RpdmUgPyB0aGlzLm9uRHJhZ01vdmUoZSkgOiB0aGlzLm9uTW92ZShlKTtcblxuICAgICAgaWYgKENvbXBhdGliaWxpdHlIZWxwZXIuaXNUb3VjaEV2ZW50KGV2ZW50KSkge1xuICAgICAgICB0aGlzLm9uTW92ZUV2ZW50TGlzdGVuZXIgPSB0aGlzLmV2ZW50TGlzdGVuZXJIZWxwZXIuYXR0YWNoUGFzc2l2ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgZG9jdW1lbnQsICd0b3VjaG1vdmUnLCBvbk1vdmVDYWxsYmFjaywgdGhpcy52aWV3T3B0aW9ucy50b3VjaEV2ZW50c0ludGVydmFsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25Nb3ZlRXZlbnRMaXN0ZW5lciA9IHRoaXMuZXZlbnRMaXN0ZW5lckhlbHBlci5hdHRhY2hFdmVudExpc3RlbmVyKFxuICAgICAgICAgIGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgb25Nb3ZlQ2FsbGJhY2ssIHRoaXMudmlld09wdGlvbnMubW91c2VFdmVudHNJbnRlcnZhbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGJpbmRFbmQpIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmVPbkVuZCgpO1xuXG4gICAgICBjb25zdCBvbkVuZENhbGxiYWNrOiAoKGU6IE1vdXNlRXZlbnR8VG91Y2hFdmVudCkgPT4gdm9pZCkgPVxuICAgICAgICAoZTogTW91c2VFdmVudHxUb3VjaEV2ZW50KTogdm9pZCA9PiB0aGlzLm9uRW5kKGUpO1xuXG4gICAgICBpZiAoQ29tcGF0aWJpbGl0eUhlbHBlci5pc1RvdWNoRXZlbnQoZXZlbnQpKSB7XG4gICAgICAgIHRoaXMub25FbmRFdmVudExpc3RlbmVyID0gdGhpcy5ldmVudExpc3RlbmVySGVscGVyLmF0dGFjaFBhc3NpdmVFdmVudExpc3RlbmVyKGRvY3VtZW50LCAndG91Y2hlbmQnLCBvbkVuZENhbGxiYWNrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25FbmRFdmVudExpc3RlbmVyID0gdGhpcy5ldmVudExpc3RlbmVySGVscGVyLmF0dGFjaEV2ZW50TGlzdGVuZXIoZG9jdW1lbnQsICdtb3VzZXVwJywgb25FbmRDYWxsYmFjayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy51c2VyQ2hhbmdlU3RhcnQuZW1pdCh0aGlzLmdldENoYW5nZUNvbnRleHQoKSk7XG5cbiAgICBpZiAoQ29tcGF0aWJpbGl0eUhlbHBlci5pc1RvdWNoRXZlbnQoZXZlbnQpICYmICFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCgoZXZlbnQgYXMgVG91Y2hFdmVudCkuY2hhbmdlZFRvdWNoZXMpKSB7XG4gICAgICAvLyBTdG9yZSB0aGUgdG91Y2ggaWRlbnRpZmllclxuICAgICAgaWYgKFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudG91Y2hJZCkpIHtcbiAgICAgICAgdGhpcy50b3VjaElkID0gKGV2ZW50IGFzIFRvdWNoRXZlbnQpLmNoYW5nZWRUb3VjaGVzWzBdLmlkZW50aWZpZXI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2xpY2sgZXZlbnRzLCBlaXRoZXIgd2l0aCBtb3VzZSBvciB0b3VjaCBnZXN0dXJlIGFyZSB3ZWlyZC4gU29tZXRpbWVzIHRoZXkgcmVzdWx0IGluIGZ1bGxcbiAgICAvLyBzdGFydCwgbW92ZSwgZW5kIHNlcXVlbmNlLCBhbmQgc29tZXRpbWVzLCB0aGV5IGRvbid0IC0gdGhleSBvbmx5IGludm9rZSBtb3VzZWRvd25cbiAgICAvLyBBcyBhIHdvcmthcm91bmQsIHdlIHNpbXVsYXRlIHRoZSBmaXJzdCBtb3ZlIGV2ZW50IGFuZCB0aGUgZW5kIGV2ZW50IGlmIGl0J3MgbmVjZXNzYXJ5XG4gICAgaWYgKHNpbXVsYXRlSW1tZWRpYXRlTW92ZSkge1xuICAgICAgdGhpcy5vbk1vdmUoZXZlbnQsIHRydWUpO1xuICAgIH1cblxuICAgIGlmIChzaW11bGF0ZUltbWVkaWF0ZUVuZCkge1xuICAgICAgdGhpcy5vbkVuZChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLy8gb25Nb3ZlIGV2ZW50IGhhbmRsZXJcbiAgcHJpdmF0ZSBvbk1vdmUoZXZlbnQ6IE1vdXNlRXZlbnR8VG91Y2hFdmVudCwgZnJvbVRpY2s/OiBib29sZWFuKTogdm9pZCB7XG4gICAgbGV0IHRvdWNoRm9yVGhpc1NsaWRlcjogVG91Y2ggPSBudWxsO1xuXG4gICAgaWYgKENvbXBhdGliaWxpdHlIZWxwZXIuaXNUb3VjaEV2ZW50KGV2ZW50KSkge1xuICAgICAgY29uc3QgY2hhbmdlZFRvdWNoZXM6IFRvdWNoTGlzdCA9IChldmVudCBhcyBUb3VjaEV2ZW50KS5jaGFuZ2VkVG91Y2hlcztcbiAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBjaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY2hhbmdlZFRvdWNoZXNbaV0uaWRlbnRpZmllciA9PT0gdGhpcy50b3VjaElkKSB7XG4gICAgICAgICAgdG91Y2hGb3JUaGlzU2xpZGVyID0gY2hhbmdlZFRvdWNoZXNbaV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRvdWNoRm9yVGhpc1NsaWRlcikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLmFuaW1hdGUgJiYgIXRoaXMudmlld09wdGlvbnMuYW5pbWF0ZU9uTW92ZSkge1xuICAgICAgaWYgKHRoaXMubW92aW5nKSB7XG4gICAgICAgIHRoaXMuc2xpZGVyRWxlbWVudEFuaW1hdGVDbGFzcyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubW92aW5nID0gdHJ1ZTtcblxuICAgIGNvbnN0IG5ld1BvczogbnVtYmVyID0gIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRvdWNoRm9yVGhpc1NsaWRlcilcbiAgICAgID8gdGhpcy5nZXRFdmVudFBvc2l0aW9uKGV2ZW50LCB0b3VjaEZvclRoaXNTbGlkZXIuaWRlbnRpZmllcilcbiAgICAgIDogdGhpcy5nZXRFdmVudFBvc2l0aW9uKGV2ZW50KTtcbiAgICBsZXQgbmV3VmFsdWU6IG51bWJlcjtcbiAgICBjb25zdCBjZWlsVmFsdWU6IG51bWJlciA9IHRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnRcbiAgICAgICAgPyB0aGlzLnZpZXdPcHRpb25zLmZsb29yXG4gICAgICAgIDogdGhpcy52aWV3T3B0aW9ucy5jZWlsO1xuICAgIGNvbnN0IGZsb29yVmFsdWU6IG51bWJlciA9IHRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnQgPyB0aGlzLnZpZXdPcHRpb25zLmNlaWwgOiB0aGlzLnZpZXdPcHRpb25zLmZsb29yO1xuXG4gICAgaWYgKG5ld1BvcyA8PSAwKSB7XG4gICAgICBuZXdWYWx1ZSA9IGZsb29yVmFsdWU7XG4gICAgfSBlbHNlIGlmIChuZXdQb3MgPj0gdGhpcy5tYXhIYW5kbGVQb3NpdGlvbikge1xuICAgICAgbmV3VmFsdWUgPSBjZWlsVmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1ZhbHVlID0gdGhpcy5wb3NpdGlvblRvVmFsdWUobmV3UG9zKTtcbiAgICAgIGlmIChmcm9tVGljayAmJiAhVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy50aWNrU3RlcCkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSB0aGlzLnJvdW5kU3RlcChuZXdWYWx1ZSwgdGhpcy52aWV3T3B0aW9ucy50aWNrU3RlcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdWYWx1ZSA9IHRoaXMucm91bmRTdGVwKG5ld1ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wb3NpdGlvblRyYWNraW5nSGFuZGxlKG5ld1ZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgb25FbmQoZXZlbnQ6IE1vdXNlRXZlbnR8VG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGlmIChDb21wYXRpYmlsaXR5SGVscGVyLmlzVG91Y2hFdmVudChldmVudCkpIHtcbiAgICAgIGNvbnN0IGNoYW5nZWRUb3VjaGVzOiBUb3VjaExpc3QgPSAoZXZlbnQgYXMgVG91Y2hFdmVudCkuY2hhbmdlZFRvdWNoZXM7XG4gICAgICBpZiAoY2hhbmdlZFRvdWNoZXNbMF0uaWRlbnRpZmllciAhPT0gdGhpcy50b3VjaElkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm1vdmluZyA9IGZhbHNlO1xuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLmFuaW1hdGUpIHtcbiAgICAgIHRoaXMuc2xpZGVyRWxlbWVudEFuaW1hdGVDbGFzcyA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy50b3VjaElkID0gbnVsbDtcblxuICAgIGlmICghdGhpcy52aWV3T3B0aW9ucy5rZXlib2FyZFN1cHBvcnQpIHtcbiAgICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuZHJhZ2dpbmcuYWN0aXZlID0gZmFsc2U7XG5cbiAgICB0aGlzLnVuc3Vic2NyaWJlT25Nb3ZlKCk7XG4gICAgdGhpcy51bnN1YnNjcmliZU9uRW5kKCk7XG5cbiAgICB0aGlzLnVzZXJDaGFuZ2VFbmQuZW1pdCh0aGlzLmdldENoYW5nZUNvbnRleHQoKSk7XG4gIH1cblxuICBwcml2YXRlIG9uUG9pbnRlckZvY3VzKHBvaW50ZXJUeXBlOiBQb2ludGVyVHlwZSk6IHZvaWQge1xuICAgIGNvbnN0IHBvaW50ZXJFbGVtZW50OiBTbGlkZXJIYW5kbGVEaXJlY3RpdmUgPSB0aGlzLmdldFBvaW50ZXJFbGVtZW50KHBvaW50ZXJUeXBlKTtcbiAgICBwb2ludGVyRWxlbWVudC5vbignYmx1cicsICgpOiB2b2lkID0+IHRoaXMub25Qb2ludGVyQmx1cihwb2ludGVyRWxlbWVudCkpO1xuICAgIHBvaW50ZXJFbGVtZW50Lm9uKCdrZXlkb3duJywgKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCA9PiB0aGlzLm9uS2V5Ym9hcmRFdmVudChldmVudCkpO1xuICAgIHBvaW50ZXJFbGVtZW50Lm9uKCdrZXl1cCcsICgpOiB2b2lkID0+IHRoaXMub25LZXlVcCgpKTtcbiAgICBwb2ludGVyRWxlbWVudC5hY3RpdmUgPSB0cnVlO1xuXG4gICAgdGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID0gcG9pbnRlclR5cGU7XG4gICAgdGhpcy5jdXJyZW50Rm9jdXNQb2ludGVyID0gcG9pbnRlclR5cGU7XG4gICAgdGhpcy5maXJzdEtleURvd24gPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBvbktleVVwKCk6IHZvaWQge1xuICAgIHRoaXMuZmlyc3RLZXlEb3duID0gdHJ1ZTtcbiAgICB0aGlzLnVzZXJDaGFuZ2VFbmQuZW1pdCh0aGlzLmdldENoYW5nZUNvbnRleHQoKSk7XG4gIH1cblxuICBwcml2YXRlIG9uUG9pbnRlckJsdXIocG9pbnRlcjogU2xpZGVySGFuZGxlRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgcG9pbnRlci5vZmYoJ2JsdXInKTtcbiAgICBwb2ludGVyLm9mZigna2V5ZG93bicpO1xuICAgIHBvaW50ZXIub2ZmKCdrZXl1cCcpO1xuICAgIHBvaW50ZXIuYWN0aXZlID0gZmFsc2U7XG4gICAgaWYgKFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudG91Y2hJZCkpIHtcbiAgICAgIHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9IG51bGw7XG4gICAgICB0aGlzLmN1cnJlbnRGb2N1c1BvaW50ZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0S2V5QWN0aW9ucyhjdXJyZW50VmFsdWU6IG51bWJlcik6IHtba2V5OiBzdHJpbmddOiBudW1iZXJ9IHtcbiAgICBjb25zdCB2YWx1ZVJhbmdlOiBudW1iZXIgPSB0aGlzLnZpZXdPcHRpb25zLmNlaWwgLSB0aGlzLnZpZXdPcHRpb25zLmZsb29yO1xuXG4gICAgbGV0IGluY3JlYXNlU3RlcDogbnVtYmVyID0gY3VycmVudFZhbHVlICsgdGhpcy52aWV3T3B0aW9ucy5zdGVwO1xuICAgIGxldCBkZWNyZWFzZVN0ZXA6IG51bWJlciA9IGN1cnJlbnRWYWx1ZSAtIHRoaXMudmlld09wdGlvbnMuc3RlcDtcbiAgICBsZXQgaW5jcmVhc2VQYWdlOiBudW1iZXIgPSBjdXJyZW50VmFsdWUgKyB2YWx1ZVJhbmdlIC8gMTA7XG4gICAgbGV0IGRlY3JlYXNlUGFnZTogbnVtYmVyID0gY3VycmVudFZhbHVlIC0gdmFsdWVSYW5nZSAvIDEwO1xuXG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMucmV2ZXJzZWRDb250cm9scykge1xuICAgICAgaW5jcmVhc2VTdGVwID0gY3VycmVudFZhbHVlIC0gdGhpcy52aWV3T3B0aW9ucy5zdGVwO1xuICAgICAgZGVjcmVhc2VTdGVwID0gY3VycmVudFZhbHVlICsgdGhpcy52aWV3T3B0aW9ucy5zdGVwO1xuICAgICAgaW5jcmVhc2VQYWdlID0gY3VycmVudFZhbHVlIC0gdmFsdWVSYW5nZSAvIDEwO1xuICAgICAgZGVjcmVhc2VQYWdlID0gY3VycmVudFZhbHVlICsgdmFsdWVSYW5nZSAvIDEwO1xuICAgIH1cblxuICAgIC8vIExlZnQgdG8gcmlnaHQgZGVmYXVsdCBhY3Rpb25zXG4gICAgY29uc3QgYWN0aW9uczoge1trZXk6IHN0cmluZ106IG51bWJlcn0gPSB7XG4gICAgICBVUDogaW5jcmVhc2VTdGVwLFxuICAgICAgRE9XTjogZGVjcmVhc2VTdGVwLFxuICAgICAgTEVGVDogZGVjcmVhc2VTdGVwLFxuICAgICAgUklHSFQ6IGluY3JlYXNlU3RlcCxcbiAgICAgIFBBR0VVUDogaW5jcmVhc2VQYWdlLFxuICAgICAgUEFHRURPV046IGRlY3JlYXNlUGFnZSxcbiAgICAgIEhPTUU6IHRoaXMudmlld09wdGlvbnMucmV2ZXJzZWRDb250cm9scyA/IHRoaXMudmlld09wdGlvbnMuY2VpbCA6IHRoaXMudmlld09wdGlvbnMuZmxvb3IsXG4gICAgICBFTkQ6IHRoaXMudmlld09wdGlvbnMucmV2ZXJzZWRDb250cm9scyA/IHRoaXMudmlld09wdGlvbnMuZmxvb3IgOiB0aGlzLnZpZXdPcHRpb25zLmNlaWwsXG4gICAgfTtcbiAgICAvLyByaWdodCB0byBsZWZ0IG1lYW5zIHN3YXBwaW5nIHJpZ2h0IGFuZCBsZWZ0IGFycm93c1xuICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0KSB7XG4gICAgICBhY3Rpb25zLkxFRlQgPSBpbmNyZWFzZVN0ZXA7XG4gICAgICBhY3Rpb25zLlJJR0hUID0gZGVjcmVhc2VTdGVwO1xuICAgICAgLy8gcmlnaHQgdG8gbGVmdCBhbmQgdmVydGljYWwgbWVhbnMgd2UgYWxzbyBzd2FwIHVwIGFuZCBkb3duXG4gICAgICBpZiAodGhpcy52aWV3T3B0aW9ucy52ZXJ0aWNhbCkge1xuICAgICAgICBhY3Rpb25zLlVQID0gZGVjcmVhc2VTdGVwO1xuICAgICAgICBhY3Rpb25zLkRPV04gPSBpbmNyZWFzZVN0ZXA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhY3Rpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBvbktleWJvYXJkRXZlbnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWU6IG51bWJlciA9IHRoaXMuZ2V0Q3VycmVudFRyYWNraW5nVmFsdWUoKTtcbiAgICBjb25zdCBrZXlDb2RlOiBudW1iZXIgPSAhVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQoZXZlbnQua2V5Q29kZSlcbiAgICAgID8gZXZlbnQua2V5Q29kZVxuICAgICAgOiBldmVudC53aGljaDtcbiAgICBjb25zdCBrZXlzOiB7W2tleUNvZGU6IG51bWJlcl06IHN0cmluZ30gPSB7XG4gICAgICAgIDM4OiAnVVAnLFxuICAgICAgICA0MDogJ0RPV04nLFxuICAgICAgICAzNzogJ0xFRlQnLFxuICAgICAgICAzOTogJ1JJR0hUJyxcbiAgICAgICAgMzM6ICdQQUdFVVAnLFxuICAgICAgICAzNDogJ1BBR0VET1dOJyxcbiAgICAgICAgMzY6ICdIT01FJyxcbiAgICAgICAgMzU6ICdFTkQnLFxuICAgICAgfTtcbiAgICBjb25zdCBhY3Rpb25zOiB7W2tleTogc3RyaW5nXTogbnVtYmVyfSA9IHRoaXMuZ2V0S2V5QWN0aW9ucyhjdXJyZW50VmFsdWUpO1xuICAgIGNvbnN0IGtleTogc3RyaW5nID0ga2V5c1trZXlDb2RlXTtcbiAgICBjb25zdCBhY3Rpb246IG51bWJlciA9IGFjdGlvbnNba2V5XTtcblxuICAgIGlmIChWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZChhY3Rpb24pIHx8IFZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlcikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmICh0aGlzLmZpcnN0S2V5RG93bikge1xuICAgICAgdGhpcy5maXJzdEtleURvd24gPSBmYWxzZTtcbiAgICAgIHRoaXMudXNlckNoYW5nZVN0YXJ0LmVtaXQodGhpcy5nZXRDaGFuZ2VDb250ZXh0KCkpO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGlvblZhbHVlOiBudW1iZXIgPSBNYXRoSGVscGVyLmNsYW1wVG9SYW5nZShhY3Rpb24sIHRoaXMudmlld09wdGlvbnMuZmxvb3IsIHRoaXMudmlld09wdGlvbnMuY2VpbCk7XG4gICAgY29uc3QgbmV3VmFsdWU6IG51bWJlciA9IHRoaXMucm91bmRTdGVwKGFjdGlvblZhbHVlKTtcbiAgICBpZiAoIXRoaXMudmlld09wdGlvbnMuZHJhZ2dhYmxlUmFuZ2VPbmx5KSB7XG4gICAgICB0aGlzLnBvc2l0aW9uVHJhY2tpbmdIYW5kbGUobmV3VmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaWZmZXJlbmNlOiBudW1iZXIgPSB0aGlzLnZpZXdIaWdoVmFsdWUgLSB0aGlzLnZpZXdMb3dWYWx1ZTtcbiAgICAgIGxldCBuZXdNaW5WYWx1ZTogbnVtYmVyO1xuICAgICAgbGV0IG5ld01heFZhbHVlOiBudW1iZXI7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXIgPT09IFBvaW50ZXJUeXBlLk1pbikge1xuICAgICAgICBuZXdNaW5WYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICBuZXdNYXhWYWx1ZSA9IG5ld1ZhbHVlICsgZGlmZmVyZW5jZTtcbiAgICAgICAgaWYgKG5ld01heFZhbHVlID4gdGhpcy52aWV3T3B0aW9ucy5jZWlsKSB7XG4gICAgICAgICAgbmV3TWF4VmFsdWUgPSB0aGlzLnZpZXdPcHRpb25zLmNlaWw7XG4gICAgICAgICAgbmV3TWluVmFsdWUgPSBuZXdNYXhWYWx1ZSAtIGRpZmZlcmVuY2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NYXgpIHtcbiAgICAgICAgbmV3TWF4VmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgbmV3TWluVmFsdWUgPSBuZXdWYWx1ZSAtIGRpZmZlcmVuY2U7XG4gICAgICAgIGlmIChuZXdNaW5WYWx1ZSA8IHRoaXMudmlld09wdGlvbnMuZmxvb3IpIHtcbiAgICAgICAgICBuZXdNaW5WYWx1ZSA9IHRoaXMudmlld09wdGlvbnMuZmxvb3I7XG4gICAgICAgICAgbmV3TWF4VmFsdWUgPSBuZXdNaW5WYWx1ZSArIGRpZmZlcmVuY2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMucG9zaXRpb25UcmFja2luZ0JhcihuZXdNaW5WYWx1ZSwgbmV3TWF4VmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIG9uRHJhZ1N0YXJ0IGV2ZW50IGhhbmRsZXIsIGhhbmRsZXMgZHJhZ2dpbmcgb2YgdGhlIG1pZGRsZSBiYXJcbiAgcHJpdmF0ZSBvbkRyYWdTdGFydChwb2ludGVyVHlwZTogUG9pbnRlclR5cGUsIGV2ZW50OiBNb3VzZUV2ZW50fFRvdWNoRXZlbnQsXG4gICAgYmluZE1vdmU6IGJvb2xlYW4sIGJpbmRFbmQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCBwb3NpdGlvbjogbnVtYmVyID0gdGhpcy5nZXRFdmVudFBvc2l0aW9uKGV2ZW50KTtcblxuICAgIHRoaXMuZHJhZ2dpbmcgPSBuZXcgRHJhZ2dpbmcoKTtcbiAgICB0aGlzLmRyYWdnaW5nLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5kcmFnZ2luZy52YWx1ZSA9IHRoaXMucG9zaXRpb25Ub1ZhbHVlKHBvc2l0aW9uKTtcbiAgICB0aGlzLmRyYWdnaW5nLmRpZmZlcmVuY2UgPSB0aGlzLnZpZXdIaWdoVmFsdWUgLSB0aGlzLnZpZXdMb3dWYWx1ZTtcbiAgICB0aGlzLmRyYWdnaW5nLmxvd0xpbWl0ID0gdGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdFxuICAgICAgICA/IHRoaXMubWluSGFuZGxlRWxlbWVudC5wb3NpdGlvbiAtIHBvc2l0aW9uXG4gICAgICAgIDogcG9zaXRpb24gLSB0aGlzLm1pbkhhbmRsZUVsZW1lbnQucG9zaXRpb247XG4gICAgdGhpcy5kcmFnZ2luZy5oaWdoTGltaXQgPSB0aGlzLnZpZXdPcHRpb25zLnJpZ2h0VG9MZWZ0XG4gICAgICAgID8gcG9zaXRpb24gLSB0aGlzLm1heEhhbmRsZUVsZW1lbnQucG9zaXRpb25cbiAgICAgICAgOiB0aGlzLm1heEhhbmRsZUVsZW1lbnQucG9zaXRpb24gLSBwb3NpdGlvbjtcblxuICAgIHRoaXMub25TdGFydChwb2ludGVyVHlwZSwgZXZlbnQsIGJpbmRNb3ZlLCBiaW5kRW5kKTtcbiAgfVxuXG4gIC8qKiBHZXQgbWluIHZhbHVlIGRlcGVuZGluZyBvbiB3aGV0aGVyIHRoZSBuZXdQb3MgaXMgb3V0T2ZCb3VuZHMgYWJvdmUgb3IgYmVsb3cgdGhlIGJhciBhbmQgcmlnaHRUb0xlZnQgKi9cbiAgcHJpdmF0ZSBnZXRNaW5WYWx1ZShuZXdQb3M6IG51bWJlciwgb3V0T2ZCb3VuZHM6IGJvb2xlYW4sIGlzQWJvdmU6IGJvb2xlYW4pOiBudW1iZXIge1xuICAgIGNvbnN0IGlzUlRMOiBib29sZWFuID0gdGhpcy52aWV3T3B0aW9ucy5yaWdodFRvTGVmdDtcbiAgICBsZXQgdmFsdWU6IG51bWJlciA9IG51bGw7XG5cbiAgICBpZiAob3V0T2ZCb3VuZHMpIHtcbiAgICAgIGlmIChpc0Fib3ZlKSB7XG4gICAgICAgIHZhbHVlID0gaXNSVExcbiAgICAgICAgICA/IHRoaXMudmlld09wdGlvbnMuZmxvb3JcbiAgICAgICAgICA6IHRoaXMudmlld09wdGlvbnMuY2VpbCAtIHRoaXMuZHJhZ2dpbmcuZGlmZmVyZW5jZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gaXNSVExcbiAgICAgICAgICA/IHRoaXMudmlld09wdGlvbnMuY2VpbCAtIHRoaXMuZHJhZ2dpbmcuZGlmZmVyZW5jZVxuICAgICAgICAgIDogdGhpcy52aWV3T3B0aW9ucy5mbG9vcjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSBpc1JUTFxuICAgICAgICA/IHRoaXMucG9zaXRpb25Ub1ZhbHVlKG5ld1BvcyArIHRoaXMuZHJhZ2dpbmcubG93TGltaXQpXG4gICAgICAgIDogdGhpcy5wb3NpdGlvblRvVmFsdWUobmV3UG9zIC0gdGhpcy5kcmFnZ2luZy5sb3dMaW1pdCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJvdW5kU3RlcCh2YWx1ZSk7XG4gIH1cblxuICAvKiogR2V0IG1heCB2YWx1ZSBkZXBlbmRpbmcgb24gd2hldGhlciB0aGUgbmV3UG9zIGlzIG91dE9mQm91bmRzIGFib3ZlIG9yIGJlbG93IHRoZSBiYXIgYW5kIHJpZ2h0VG9MZWZ0ICovXG4gIHByaXZhdGUgZ2V0TWF4VmFsdWUobmV3UG9zOiBudW1iZXIsIG91dE9mQm91bmRzOiBib29sZWFuLCBpc0Fib3ZlOiBib29sZWFuKTogbnVtYmVyIHtcbiAgICBjb25zdCBpc1JUTDogYm9vbGVhbiA9IHRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnQ7XG4gICAgbGV0IHZhbHVlOiBudW1iZXIgPSBudWxsO1xuXG4gICAgaWYgKG91dE9mQm91bmRzKSB7XG4gICAgICBpZiAoaXNBYm92ZSkge1xuICAgICAgICB2YWx1ZSA9IGlzUlRMXG4gICAgICAgICAgPyB0aGlzLnZpZXdPcHRpb25zLmZsb29yICsgdGhpcy5kcmFnZ2luZy5kaWZmZXJlbmNlXG4gICAgICAgICAgOiB0aGlzLnZpZXdPcHRpb25zLmNlaWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IGlzUlRMXG4gICAgICAgICAgPyB0aGlzLnZpZXdPcHRpb25zLmNlaWxcbiAgICAgICAgICA6IHRoaXMudmlld09wdGlvbnMuZmxvb3IgKyB0aGlzLmRyYWdnaW5nLmRpZmZlcmVuY2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc1JUTCkge1xuICAgICAgICB2YWx1ZSA9XG4gICAgICAgICAgdGhpcy5wb3NpdGlvblRvVmFsdWUobmV3UG9zICsgdGhpcy5kcmFnZ2luZy5sb3dMaW1pdCkgK1xuICAgICAgICAgIHRoaXMuZHJhZ2dpbmcuZGlmZmVyZW5jZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID1cbiAgICAgICAgICB0aGlzLnBvc2l0aW9uVG9WYWx1ZShuZXdQb3MgLSB0aGlzLmRyYWdnaW5nLmxvd0xpbWl0KSArXG4gICAgICAgICAgdGhpcy5kcmFnZ2luZy5kaWZmZXJlbmNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJvdW5kU3RlcCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIG9uRHJhZ01vdmUoZXZlbnQ/OiBNb3VzZUV2ZW50fFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBuZXdQb3M6IG51bWJlciA9IHRoaXMuZ2V0RXZlbnRQb3NpdGlvbihldmVudCk7XG5cbiAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5hbmltYXRlICYmICF0aGlzLnZpZXdPcHRpb25zLmFuaW1hdGVPbk1vdmUpIHtcbiAgICAgIGlmICh0aGlzLm1vdmluZykge1xuICAgICAgICB0aGlzLnNsaWRlckVsZW1lbnRBbmltYXRlQ2xhc3MgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm1vdmluZyA9IHRydWU7XG5cbiAgICBsZXQgY2VpbExpbWl0OiBudW1iZXIsXG4gICAgICAgIGZsb29yTGltaXQ6IG51bWJlcixcbiAgICAgICAgZmxvb3JIYW5kbGVFbGVtZW50OiBTbGlkZXJIYW5kbGVEaXJlY3RpdmUsXG4gICAgICAgIGNlaWxIYW5kbGVFbGVtZW50OiBTbGlkZXJIYW5kbGVEaXJlY3RpdmU7XG4gICAgaWYgKHRoaXMudmlld09wdGlvbnMucmlnaHRUb0xlZnQpIHtcbiAgICAgIGNlaWxMaW1pdCA9IHRoaXMuZHJhZ2dpbmcubG93TGltaXQ7XG4gICAgICBmbG9vckxpbWl0ID0gdGhpcy5kcmFnZ2luZy5oaWdoTGltaXQ7XG4gICAgICBmbG9vckhhbmRsZUVsZW1lbnQgPSB0aGlzLm1heEhhbmRsZUVsZW1lbnQ7XG4gICAgICBjZWlsSGFuZGxlRWxlbWVudCA9IHRoaXMubWluSGFuZGxlRWxlbWVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2VpbExpbWl0ID0gdGhpcy5kcmFnZ2luZy5oaWdoTGltaXQ7XG4gICAgICBmbG9vckxpbWl0ID0gdGhpcy5kcmFnZ2luZy5sb3dMaW1pdDtcbiAgICAgIGZsb29ySGFuZGxlRWxlbWVudCA9IHRoaXMubWluSGFuZGxlRWxlbWVudDtcbiAgICAgIGNlaWxIYW5kbGVFbGVtZW50ID0gdGhpcy5tYXhIYW5kbGVFbGVtZW50O1xuICAgIH1cblxuICAgIGNvbnN0IGlzVW5kZXJGbG9vckxpbWl0OiBib29sZWFuID0gKG5ld1BvcyA8PSBmbG9vckxpbWl0KTtcbiAgICBjb25zdCBpc092ZXJDZWlsTGltaXQ6IGJvb2xlYW4gPSAobmV3UG9zID49IHRoaXMubWF4SGFuZGxlUG9zaXRpb24gLSBjZWlsTGltaXQpO1xuXG4gICAgbGV0IG5ld01pblZhbHVlOiBudW1iZXI7XG4gICAgbGV0IG5ld01heFZhbHVlOiBudW1iZXI7XG4gICAgaWYgKGlzVW5kZXJGbG9vckxpbWl0KSB7XG4gICAgICBpZiAoZmxvb3JIYW5kbGVFbGVtZW50LnBvc2l0aW9uID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIG5ld01pblZhbHVlID0gdGhpcy5nZXRNaW5WYWx1ZShuZXdQb3MsIHRydWUsIGZhbHNlKTtcbiAgICAgIG5ld01heFZhbHVlID0gdGhpcy5nZXRNYXhWYWx1ZShuZXdQb3MsIHRydWUsIGZhbHNlKTtcbiAgICB9IGVsc2UgaWYgKGlzT3ZlckNlaWxMaW1pdCkge1xuICAgICAgaWYgKGNlaWxIYW5kbGVFbGVtZW50LnBvc2l0aW9uID09PSB0aGlzLm1heEhhbmRsZVBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIG5ld01heFZhbHVlID0gdGhpcy5nZXRNYXhWYWx1ZShuZXdQb3MsIHRydWUsIHRydWUpO1xuICAgICAgbmV3TWluVmFsdWUgPSB0aGlzLmdldE1pblZhbHVlKG5ld1BvcywgdHJ1ZSwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld01pblZhbHVlID0gdGhpcy5nZXRNaW5WYWx1ZShuZXdQb3MsIGZhbHNlLCBmYWxzZSk7XG4gICAgICBuZXdNYXhWYWx1ZSA9IHRoaXMuZ2V0TWF4VmFsdWUobmV3UG9zLCBmYWxzZSwgZmFsc2UpO1xuICAgIH1cblxuICAgIHRoaXMucG9zaXRpb25UcmFja2luZ0JhcihuZXdNaW5WYWx1ZSwgbmV3TWF4VmFsdWUpO1xuICB9XG5cbiAgLy8gU2V0IHRoZSBuZXcgdmFsdWUgYW5kIHBvc2l0aW9uIGZvciB0aGUgZW50aXJlIGJhclxuICBwcml2YXRlIHBvc2l0aW9uVHJhY2tpbmdCYXIobmV3TWluVmFsdWU6IG51bWJlciwgbmV3TWF4VmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5taW5MaW1pdCkgJiZcbiAgICAgICAgbmV3TWluVmFsdWUgPCB0aGlzLnZpZXdPcHRpb25zLm1pbkxpbWl0KSB7XG4gICAgICBuZXdNaW5WYWx1ZSA9IHRoaXMudmlld09wdGlvbnMubWluTGltaXQ7XG4gICAgICBuZXdNYXhWYWx1ZSA9IE1hdGhIZWxwZXIucm91bmRUb1ByZWNpc2lvbkxpbWl0KG5ld01pblZhbHVlICsgdGhpcy5kcmFnZ2luZy5kaWZmZXJlbmNlLCB0aGlzLnZpZXdPcHRpb25zLnByZWNpc2lvbkxpbWl0KTtcbiAgICB9XG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLm1heExpbWl0KSAmJlxuICAgICAgICBuZXdNYXhWYWx1ZSA+IHRoaXMudmlld09wdGlvbnMubWF4TGltaXQpIHtcbiAgICAgIG5ld01heFZhbHVlID0gdGhpcy52aWV3T3B0aW9ucy5tYXhMaW1pdDtcbiAgICAgIG5ld01pblZhbHVlID0gTWF0aEhlbHBlci5yb3VuZFRvUHJlY2lzaW9uTGltaXQobmV3TWF4VmFsdWUgLSB0aGlzLmRyYWdnaW5nLmRpZmZlcmVuY2UsIHRoaXMudmlld09wdGlvbnMucHJlY2lzaW9uTGltaXQpO1xuICAgIH1cblxuICAgIHRoaXMudmlld0xvd1ZhbHVlID0gbmV3TWluVmFsdWU7XG4gICAgdGhpcy52aWV3SGlnaFZhbHVlID0gbmV3TWF4VmFsdWU7XG4gICAgdGhpcy5hcHBseVZpZXdDaGFuZ2UoKTtcbiAgICB0aGlzLnVwZGF0ZUhhbmRsZXMoUG9pbnRlclR5cGUuTWluLCB0aGlzLnZhbHVlVG9Qb3NpdGlvbihuZXdNaW5WYWx1ZSkpO1xuICAgIHRoaXMudXBkYXRlSGFuZGxlcyhQb2ludGVyVHlwZS5NYXgsIHRoaXMudmFsdWVUb1Bvc2l0aW9uKG5ld01heFZhbHVlKSk7XG4gIH1cblxuICAvLyBTZXQgdGhlIG5ldyB2YWx1ZSBhbmQgcG9zaXRpb24gdG8gdGhlIGN1cnJlbnQgdHJhY2tpbmcgaGFuZGxlXG4gIHByaXZhdGUgcG9zaXRpb25UcmFja2luZ0hhbmRsZShuZXdWYWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgbmV3VmFsdWUgPSB0aGlzLmFwcGx5TWluTWF4TGltaXQobmV3VmFsdWUpO1xuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5wdXNoUmFuZ2UpIHtcbiAgICAgICAgbmV3VmFsdWUgPSB0aGlzLmFwcGx5UHVzaFJhbmdlKG5ld1ZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLnZpZXdPcHRpb25zLm5vU3dpdGNoaW5nKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWluICYmXG4gICAgICAgICAgICAgIG5ld1ZhbHVlID4gdGhpcy52aWV3SGlnaFZhbHVlKSB7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMuYXBwbHlNaW5NYXhSYW5nZSh0aGlzLnZpZXdIaWdoVmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NYXggJiZcbiAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlIDwgdGhpcy52aWV3TG93VmFsdWUpIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdGhpcy5hcHBseU1pbk1heFJhbmdlKHRoaXMudmlld0xvd1ZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbmV3VmFsdWUgPSB0aGlzLmFwcGx5TWluTWF4UmFuZ2UobmV3VmFsdWUpO1xuICAgICAgICAvKiBUaGlzIGlzIHRvIGNoZWNrIGlmIHdlIG5lZWQgdG8gc3dpdGNoIHRoZSBtaW4gYW5kIG1heCBoYW5kbGVzICovXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXIgPT09IFBvaW50ZXJUeXBlLk1pbiAmJiBuZXdWYWx1ZSA+IHRoaXMudmlld0hpZ2hWYWx1ZSkge1xuICAgICAgICAgIHRoaXMudmlld0xvd1ZhbHVlID0gdGhpcy52aWV3SGlnaFZhbHVlO1xuICAgICAgICAgIHRoaXMuYXBwbHlWaWV3Q2hhbmdlKCk7XG4gICAgICAgICAgdGhpcy51cGRhdGVIYW5kbGVzKFBvaW50ZXJUeXBlLk1pbiwgdGhpcy5tYXhIYW5kbGVFbGVtZW50LnBvc2l0aW9uKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUFyaWFBdHRyaWJ1dGVzKCk7XG4gICAgICAgICAgdGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID0gUG9pbnRlclR5cGUuTWF4O1xuICAgICAgICAgIHRoaXMubWluSGFuZGxlRWxlbWVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLm1heEhhbmRsZUVsZW1lbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICBpZiAodGhpcy52aWV3T3B0aW9ucy5rZXlib2FyZFN1cHBvcnQpIHtcbiAgICAgICAgICAgIHRoaXMubWF4SGFuZGxlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXIgPT09IFBvaW50ZXJUeXBlLk1heCAmJlxuICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlIDwgdGhpcy52aWV3TG93VmFsdWUpIHtcbiAgICAgICAgICB0aGlzLnZpZXdIaWdoVmFsdWUgPSB0aGlzLnZpZXdMb3dWYWx1ZTtcbiAgICAgICAgICB0aGlzLmFwcGx5Vmlld0NoYW5nZSgpO1xuICAgICAgICAgIHRoaXMudXBkYXRlSGFuZGxlcyhQb2ludGVyVHlwZS5NYXgsIHRoaXMubWluSGFuZGxlRWxlbWVudC5wb3NpdGlvbik7XG4gICAgICAgICAgdGhpcy51cGRhdGVBcmlhQXR0cmlidXRlcygpO1xuICAgICAgICAgIHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9IFBvaW50ZXJUeXBlLk1pbjtcbiAgICAgICAgICB0aGlzLm1heEhhbmRsZUVsZW1lbnQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5taW5IYW5kbGVFbGVtZW50LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgaWYgKHRoaXMudmlld09wdGlvbnMua2V5Ym9hcmRTdXBwb3J0KSB7XG4gICAgICAgICAgICB0aGlzLm1pbkhhbmRsZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5nZXRDdXJyZW50VHJhY2tpbmdWYWx1ZSgpICE9PSBuZXdWYWx1ZSkge1xuICAgICAgaWYgKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWluKSB7XG4gICAgICAgIHRoaXMudmlld0xvd1ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIHRoaXMuYXBwbHlWaWV3Q2hhbmdlKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWF4KSB7XG4gICAgICAgIHRoaXMudmlld0hpZ2hWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB0aGlzLmFwcGx5Vmlld0NoYW5nZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy51cGRhdGVIYW5kbGVzKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciwgdGhpcy52YWx1ZVRvUG9zaXRpb24obmV3VmFsdWUpKTtcbiAgICAgIHRoaXMudXBkYXRlQXJpYUF0dHJpYnV0ZXMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGx5TWluTWF4TGltaXQobmV3VmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLm1pbkxpbWl0KSAmJiBuZXdWYWx1ZSA8IHRoaXMudmlld09wdGlvbnMubWluTGltaXQpIHtcbiAgICAgIHJldHVybiB0aGlzLnZpZXdPcHRpb25zLm1pbkxpbWl0O1xuICAgIH1cbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMubWF4TGltaXQpICYmIG5ld1ZhbHVlID4gdGhpcy52aWV3T3B0aW9ucy5tYXhMaW1pdCkge1xuICAgICAgcmV0dXJuIHRoaXMudmlld09wdGlvbnMubWF4TGltaXQ7XG4gICAgfVxuICAgIHJldHVybiBuZXdWYWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlNaW5NYXhSYW5nZShuZXdWYWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBvcHBvc2l0ZVZhbHVlOiBudW1iZXIgPSAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NaW4pXG4gICAgICA/IHRoaXMudmlld0hpZ2hWYWx1ZVxuICAgICAgOiB0aGlzLnZpZXdMb3dWYWx1ZTtcbiAgICBjb25zdCBkaWZmZXJlbmNlOiBudW1iZXIgPSBNYXRoLmFicyhuZXdWYWx1ZSAtIG9wcG9zaXRlVmFsdWUpO1xuICAgIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQodGhpcy52aWV3T3B0aW9ucy5taW5SYW5nZSkpIHtcbiAgICAgIGlmIChkaWZmZXJlbmNlIDwgdGhpcy52aWV3T3B0aW9ucy5taW5SYW5nZSkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NaW4pIHtcbiAgICAgICAgICByZXR1cm4gTWF0aEhlbHBlci5yb3VuZFRvUHJlY2lzaW9uTGltaXQodGhpcy52aWV3SGlnaFZhbHVlIC0gdGhpcy52aWV3T3B0aW9ucy5taW5SYW5nZSwgdGhpcy52aWV3T3B0aW9ucy5wcmVjaXNpb25MaW1pdCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NYXgpIHtcbiAgICAgICAgICByZXR1cm4gTWF0aEhlbHBlci5yb3VuZFRvUHJlY2lzaW9uTGltaXQodGhpcy52aWV3TG93VmFsdWUgKyB0aGlzLnZpZXdPcHRpb25zLm1pblJhbmdlLCB0aGlzLnZpZXdPcHRpb25zLnByZWNpc2lvbkxpbWl0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIVZhbHVlSGVscGVyLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudmlld09wdGlvbnMubWF4UmFuZ2UpKSB7XG4gICAgICBpZiAoZGlmZmVyZW5jZSA+IHRoaXMudmlld09wdGlvbnMubWF4UmFuZ2UpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWluKSB7XG4gICAgICAgICAgcmV0dXJuIE1hdGhIZWxwZXIucm91bmRUb1ByZWNpc2lvbkxpbWl0KHRoaXMudmlld0hpZ2hWYWx1ZSAtIHRoaXMudmlld09wdGlvbnMubWF4UmFuZ2UsIHRoaXMudmlld09wdGlvbnMucHJlY2lzaW9uTGltaXQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFRyYWNraW5nUG9pbnRlciA9PT0gUG9pbnRlclR5cGUuTWF4KSB7XG4gICAgICAgICAgcmV0dXJuIE1hdGhIZWxwZXIucm91bmRUb1ByZWNpc2lvbkxpbWl0KHRoaXMudmlld0xvd1ZhbHVlICsgdGhpcy52aWV3T3B0aW9ucy5tYXhSYW5nZSwgdGhpcy52aWV3T3B0aW9ucy5wcmVjaXNpb25MaW1pdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld1ZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVB1c2hSYW5nZShuZXdWYWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBkaWZmZXJlbmNlOiBudW1iZXIgPSAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NaW4pXG4gICAgICAgICAgPyB0aGlzLnZpZXdIaWdoVmFsdWUgLSBuZXdWYWx1ZVxuICAgICAgICAgIDogbmV3VmFsdWUgLSB0aGlzLnZpZXdMb3dWYWx1ZTtcbiAgICBjb25zdCBtaW5SYW5nZTogbnVtYmVyID0gKCFWYWx1ZUhlbHBlci5pc051bGxPclVuZGVmaW5lZCh0aGlzLnZpZXdPcHRpb25zLm1pblJhbmdlKSlcbiAgICAgICAgICA/IHRoaXMudmlld09wdGlvbnMubWluUmFuZ2VcbiAgICAgICAgICA6IHRoaXMudmlld09wdGlvbnMuc3RlcDtcbiAgICBjb25zdCBtYXhSYW5nZTogbnVtYmVyID0gdGhpcy52aWV3T3B0aW9ucy5tYXhSYW5nZTtcbiAgICAvLyBpZiBzbWFsbGVyIHRoYW4gbWluUmFuZ2VcbiAgICBpZiAoZGlmZmVyZW5jZSA8IG1pblJhbmdlKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NaW4pIHtcbiAgICAgICAgdGhpcy52aWV3SGlnaFZhbHVlID0gTWF0aEhlbHBlci5yb3VuZFRvUHJlY2lzaW9uTGltaXQoXG4gICAgICAgICAgTWF0aC5taW4obmV3VmFsdWUgKyBtaW5SYW5nZSwgdGhpcy52aWV3T3B0aW9ucy5jZWlsKSwgdGhpcy52aWV3T3B0aW9ucy5wcmVjaXNpb25MaW1pdCk7XG4gICAgICAgIG5ld1ZhbHVlID0gTWF0aEhlbHBlci5yb3VuZFRvUHJlY2lzaW9uTGltaXQodGhpcy52aWV3SGlnaFZhbHVlIC0gbWluUmFuZ2UsIHRoaXMudmlld09wdGlvbnMucHJlY2lzaW9uTGltaXQpO1xuICAgICAgICB0aGlzLmFwcGx5Vmlld0NoYW5nZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUhhbmRsZXMoUG9pbnRlclR5cGUuTWF4LCB0aGlzLnZhbHVlVG9Qb3NpdGlvbih0aGlzLnZpZXdIaWdoVmFsdWUpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NYXgpIHtcbiAgICAgICAgdGhpcy52aWV3TG93VmFsdWUgPSBNYXRoSGVscGVyLnJvdW5kVG9QcmVjaXNpb25MaW1pdChcbiAgICAgICAgICBNYXRoLm1heChuZXdWYWx1ZSAtIG1pblJhbmdlLCB0aGlzLnZpZXdPcHRpb25zLmZsb29yKSwgdGhpcy52aWV3T3B0aW9ucy5wcmVjaXNpb25MaW1pdCk7XG4gICAgICAgIG5ld1ZhbHVlID0gTWF0aEhlbHBlci5yb3VuZFRvUHJlY2lzaW9uTGltaXQodGhpcy52aWV3TG93VmFsdWUgKyBtaW5SYW5nZSwgdGhpcy52aWV3T3B0aW9ucy5wcmVjaXNpb25MaW1pdCk7XG4gICAgICAgIHRoaXMuYXBwbHlWaWV3Q2hhbmdlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlSGFuZGxlcyhQb2ludGVyVHlwZS5NaW4sIHRoaXMudmFsdWVUb1Bvc2l0aW9uKHRoaXMudmlld0xvd1ZhbHVlKSk7XG4gICAgICB9XG4gICAgICB0aGlzLnVwZGF0ZUFyaWFBdHRyaWJ1dGVzKCk7XG4gICAgfSBlbHNlIGlmICghVmFsdWVIZWxwZXIuaXNOdWxsT3JVbmRlZmluZWQobWF4UmFuZ2UpICYmIGRpZmZlcmVuY2UgPiBtYXhSYW5nZSkge1xuICAgICAgLy8gaWYgZ3JlYXRlciB0aGFuIG1heFJhbmdlXG4gICAgICBpZiAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NaW4pIHtcbiAgICAgICAgdGhpcy52aWV3SGlnaFZhbHVlID0gTWF0aEhlbHBlci5yb3VuZFRvUHJlY2lzaW9uTGltaXQobmV3VmFsdWUgKyBtYXhSYW5nZSwgdGhpcy52aWV3T3B0aW9ucy5wcmVjaXNpb25MaW1pdCk7XG4gICAgICAgIHRoaXMuYXBwbHlWaWV3Q2hhbmdlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlSGFuZGxlcyhQb2ludGVyVHlwZS5NYXgsIHRoaXMudmFsdWVUb1Bvc2l0aW9uKHRoaXMudmlld0hpZ2hWYWx1ZSlcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50VHJhY2tpbmdQb2ludGVyID09PSBQb2ludGVyVHlwZS5NYXgpIHtcbiAgICAgICAgdGhpcy52aWV3TG93VmFsdWUgPSBNYXRoSGVscGVyLnJvdW5kVG9QcmVjaXNpb25MaW1pdChuZXdWYWx1ZSAtIG1heFJhbmdlLCB0aGlzLnZpZXdPcHRpb25zLnByZWNpc2lvbkxpbWl0KTtcbiAgICAgICAgdGhpcy5hcHBseVZpZXdDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy51cGRhdGVIYW5kbGVzKFBvaW50ZXJUeXBlLk1pbiwgdGhpcy52YWx1ZVRvUG9zaXRpb24odGhpcy52aWV3TG93VmFsdWUpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudXBkYXRlQXJpYUF0dHJpYnV0ZXMoKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld1ZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDaGFuZ2VDb250ZXh0KCk6IENoYW5nZUNvbnRleHQge1xuICAgIGNvbnN0IGNoYW5nZUNvbnRleHQ6IENoYW5nZUNvbnRleHQgPSBuZXcgQ2hhbmdlQ29udGV4dCgpO1xuICAgIGNoYW5nZUNvbnRleHQucG9pbnRlclR5cGUgPSB0aGlzLmN1cnJlbnRUcmFja2luZ1BvaW50ZXI7XG4gICAgY2hhbmdlQ29udGV4dC52YWx1ZSA9ICt0aGlzLnZhbHVlO1xuICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICBjaGFuZ2VDb250ZXh0LmhpZ2hWYWx1ZSA9ICt0aGlzLmhpZ2hWYWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGNoYW5nZUNvbnRleHQ7XG4gIH1cbn1cbiJdfQ==