/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
var LabelType = {
    /** Label above low pointer */
    Low: 0,
    /** Label above high pointer */
    High: 1,
    /** Label for minimum slider value */
    Floor: 2,
    /** Label for maximum slider value */
    Ceil: 3,
    /** Label below legend tick */
    TickValue: 4,
};
export { LabelType };
LabelType[LabelType.Low] = 'Low';
LabelType[LabelType.High] = 'High';
LabelType[LabelType.Floor] = 'Floor';
LabelType[LabelType.Ceil] = 'Ceil';
LabelType[LabelType.TickValue] = 'TickValue';
/** @typedef {?} */
var TranslateFunction;
export { TranslateFunction };
/** @typedef {?} */
var CombineLabelsFunction;
export { CombineLabelsFunction };
/** @typedef {?} */
var GetLegendFunction;
export { GetLegendFunction };
/** @typedef {?} */
var GetStepLegendFunction;
export { GetStepLegendFunction };
/** @typedef {?} */
var ValueToPositionFunction;
export { ValueToPositionFunction };
/** @typedef {?} */
var PositionToValueFunction;
export { PositionToValueFunction };
/**
 * Custom step definition
 *
 * This can be used to specify custom values and legend values for slider ticks
 * @record
 */
export function CustomStepDefinition() { }
/**
 * Value
 * @type {?}
 */
CustomStepDefinition.prototype.value;
/**
 * Legend (label for the value)
 * @type {?|undefined}
 */
CustomStepDefinition.prototype.legend;
/**
 * Slider options
 */
var /**
 * Slider options
 */
Options = /** @class */ (function () {
    function Options() {
        /**
         * Minimum value for a slider.
         * Not applicable when using stepsArray.
         */
        this.floor = 0;
        /**
         * Maximum value for a slider.
         * Not applicable when using stepsArray.
         */
        this.ceil = null;
        /**
         * Step between each value.
         * Not applicable when using stepsArray.
         */
        this.step = 1;
        /**
         * The minimum range authorized on the slider.
         * Applies to range slider only.
         * When using stepsArray, expressed as index into stepsArray.
         */
        this.minRange = null;
        /**
         * The maximum range authorized on the slider.
         * Applies to range slider only.
         * When using stepsArray, expressed as index into stepsArray.
         */
        this.maxRange = null;
        /**
         * Set to true to have a push behavior. When the min handle goes above the max,
         * the max is moved as well (and vice-versa). The range between min and max is
         * defined by the step option (defaults to 1) and can also be overriden by
         * the minRange option. Applies to range slider only.
         */
        this.pushRange = false;
        /**
         * The minimum value authorized on the slider.
         * When using stepsArray, expressed as index into stepsArray.
         */
        this.minLimit = null;
        /**
         * The maximum value authorized on the slider.
         * When using stepsArray, expressed as index into stepsArray.
         */
        this.maxLimit = null;
        /**
         * Custom translate function. Use this if you want to translate values displayed
         * on the slider.
         */
        this.translate = null;
        /**
         * Custom function for combining overlapping labels in range slider.
         * It takes the min and max values (already translated with translate fuction)
         * and should return how these two values should be combined.
         * If not provided, the default function will join the two values with
         * ' - ' as separator.
         */
        this.combineLabels = null;
        /**
         * Use to display legend under ticks (thus, it needs to be used along with
         * showTicks or showTicksValues). The function will be called with each tick
         * value and returned content will be displayed under the tick as a legend.
         * If the returned value is null, then no legend is displayed under
         * the corresponding tick.You can also directly provide the legend values
         * in the stepsArray option.
         */
        this.getLegend = null;
        /**
         * Use to display a custom legend of a stepItem from stepsArray.
         * It will be the same as getLegen but for stepsArray.
         */
        this.getStepLegend = null;
        /**
         * If you want to display a slider with non linear/number steps.
         * Just pass an array with each slider value and that's it; the floor, ceil and step settings
         * of the slider will be computed automatically.
         * By default, the value model and valueHigh model values will be the value of the selected item
         * in the stepsArray.
         * They can also be bound to the index of the selected item by setting the bindIndexForStepsArray
         * option to true.
         */
        this.stepsArray = null;
        /**
         * Set to true to bind the index of the selected item to value model and valueHigh model.
         */
        this.bindIndexForStepsArray = false;
        /**
         * When set to true and using a range slider, the range can be dragged by the selection bar.
         * Applies to range slider only.
         */
        this.draggableRange = false;
        /**
         * Same as draggableRange but the slider range can't be changed.
         * Applies to range slider only.
         */
        this.draggableRangeOnly = false;
        /**
         * Set to true to always show the selection bar before the slider handle.
         */
        this.showSelectionBar = false;
        /**
         * Set to true to always show the selection bar after the slider handle.
         */
        this.showSelectionBarEnd = false;
        /**
         * Set a number to draw the selection bar between this value and the slider handle.
         * When using stepsArray, expressed as index into stepsArray.
         */
        this.showSelectionBarFromValue = null;
        /**
         * Only for range slider. Set to true to visualize in different colour the areas
         * on the left/right (top/bottom for vertical range slider) of selection bar between the handles.
         */
        this.showOuterSelectionBars = false;
        /**
         * Set to true to hide pointer labels
         */
        this.hidePointerLabels = false;
        /**
         * Set to true to hide min / max labels
         */
        this.hideLimitLabels = false;
        /**
         * Set to false to disable the auto-hiding behavior of the limit labels.
         */
        this.autoHideLimitLabels = true;
        /**
         * Set to true to make the slider read-only.
         */
        this.readOnly = false;
        /**
         * Set to true to disable the slider.
         */
        this.disabled = false;
        /**
         * Throttle interval for mouse events in milliseconds.
         * This is provided to avoid a flood of events when moving the slider with mouse.
         */
        this.mouseEventsInterval = 50;
        /**
         * Throttle interval for touch events in milliseconds.
         * This is provided to avoid a flood of events when moving the slider with touch gesture.
         */
        this.touchEventsInterval = 50;
        /**
         * Throttle interval for input changes (changes to bindings or reactive form inputs)
         * This is provided to avoid a flood of events on frequent input binding changes affecting performance.
         */
        this.inputEventsInterval = 100;
        /**
         * Throttle interval for output changes (signalling changes to output bindings and user callbacks)
         * This is provided to avoid a flood of outgoing events affecting Angular app performance.
         */
        this.outputEventsInterval = 100;
        /**
         * Set to true to display a tick for each step of the slider.
         */
        this.showTicks = false;
        /**
         * Set to true to display a tick and the step value for each step of the slider..
         */
        this.showTicksValues = false;
        /* The step between each tick to display. If not set, the step value is used.
            Not used when ticksArray is specified. */
        this.tickStep = null;
        /* The step between displaying each tick step value.
            If not set, then tickStep or step is used, depending on which one is set. */
        this.tickValueStep = null;
        /**
         * Use to display ticks at specific positions.
         * The array contains the index of the ticks that should be displayed.
         * For example, [0, 1, 5] will display a tick for the first, second and sixth values.
         */
        this.ticksArray = null;
        /**
         * Used to display a tooltip when a tick is hovered.
         * Set to a function that returns the tooltip content for a given value.
         */
        this.ticksTooltip = null;
        /**
         * Same as ticksTooltip but for ticks values.
         */
        this.ticksValuesTooltip = null;
        /**
         * Set to true to display the slider vertically.
         * The slider will take the full height of its parent.
         * Changing this value at runtime is not currently supported.
         */
        this.vertical = false;
        /**
         * Function that returns the current color of the selection bar.
         * If your color won't change, don't use this option but set it through CSS.
         * If the returned color depends on a model value (either value or valueHigh),
         * you should use the argument passed to the function.
         * Indeed, when the function is called, there is no certainty that the model
         * has already been updated.
         */
        this.getSelectionBarColor = null;
        /**
         * Function that returns the color of a tick. showTicks must be enabled.
         */
        this.getTickColor = null;
        /**
         * Function that returns the current color of a pointer.
         * If your color won't change, don't use this option but set it through CSS.
         * If the returned color depends on a model value (either value or valueHigh),
         * you should use the argument passed to the function.
         * Indeed, when the function is called, there is no certainty that the model has already been updated.
         * To handle range slider pointers independently, you should evaluate pointerType within the given
         * function where "min" stands for value model and "max" for valueHigh model values.
         */
        this.getPointerColor = null;
        /**
         * Handles are focusable (on click or with tab) and can be modified using the following keyboard controls:
         * Left/bottom arrows: -1
         * Right/top arrows: +1
         * Page-down: -10%
         * Page-up: +10%
         * Home: minimum value
         * End: maximum value
         */
        this.keyboardSupport = true;
        /**
         * If you display the slider in an element that uses transform: scale(0.5), set the scale value to 2
         * so that the slider is rendered properly and the events are handled correctly.
         */
        this.scale = 1;
        /**
         * Set to true to force the value(s) to be rounded to the step, even when modified from the outside.
         * When set to false, if the model values are modified from outside the slider, they are not rounded
         * and can be between two steps.
         */
        this.enforceStep = true;
        /**
         * Set to true to force the value(s) to be normalised to allowed range (floor to ceil), even when modified from the outside.
         * When set to false, if the model values are modified from outside the slider, and they are outside allowed range,
         * the slider may be rendered incorrectly. However, setting this to false may be useful if you want to perform custom normalisation.
         */
        this.enforceRange = true;
        /**
         * Set to true to force the value(s) to be rounded to the nearest step value, even when modified from the outside.
         * When set to false, if the model values are modified from outside the slider, and they are outside allowed range,
         * the slider may be rendered incorrectly. However, setting this to false may be useful if you want to perform custom normalisation.
         */
        this.enforceStepsArray = true;
        /**
         * Set to true to prevent to user from switching the min and max handles. Applies to range slider only.
         */
        this.noSwitching = false;
        /**
         * Set to true to only bind events on slider handles.
         */
        this.onlyBindHandles = false;
        /**
         * Set to true to show graphs right to left.
         * If vertical is true it will be from top to bottom and left / right arrow functions reversed.
         */
        this.rightToLeft = false;
        /**
         * Set to true to reverse keyboard navigation:
         * Right/top arrows: -1
         * Left/bottom arrows: +1
         * Page-up: -10%
         * Page-down: +10%
         * End: minimum value
         * Home: maximum value
         */
        this.reversedControls = false;
        /**
         * Set to true to keep the slider labels inside the slider bounds.
         */
        this.boundPointerLabels = true;
        /**
         * Set to true to use a logarithmic scale to display the slider.
         */
        this.logScale = false;
        /**
         * Function that returns the position on the slider for a given value.
         * The position must be a percentage between 0 and 1.
         * The function should be monotonically increasing or decreasing; otherwise the slider may behave incorrectly.
         */
        this.customValueToPosition = null;
        /**
         * Function that returns the value for a given position on the slider.
         * The position is a percentage between 0 and 1.
         * The function should be monotonically increasing or decreasing; otherwise the slider may behave incorrectly.
         */
        this.customPositionToValue = null;
        /**
         * Precision limit for calculated values.
         * Values used in calculations will be rounded to this number of significant digits
         * to prevent accumulating small floating-point errors.
         */
        this.precisionLimit = 12;
        /**
         * Use to display the selection bar as a gradient.
         * The given object must contain from and to properties which are colors.
         */
        this.selectionBarGradient = null;
        /**
         * Use to add a label directly to the slider for accessibility. Adds the aria-label attribute.
         */
        this.ariaLabel = null;
        /**
         * Use instead of ariaLabel to reference the id of an element which will be used to label the slider.
         * Adds the aria-labelledby attribute.
         */
        this.ariaLabelledBy = null;
        /**
         * Use to add a label directly to the slider range for accessibility. Adds the aria-label attribute.
         */
        this.ariaLabelHigh = null;
        /**
         * Use instead of ariaLabelHigh to reference the id of an element which will be used to label the slider range.
         * Adds the aria-labelledby attribute.
         */
        this.ariaLabelledByHigh = null;
        /**
         * Use to increase rendering performance. If the value is not provided, the slider calculates the with/height of the handle
         */
        this.handleDimension = null;
        /**
         * Use to increase rendering performance. If the value is not provided, the slider calculates the with/height of the bar
         */
        this.barDimension = null;
        /**
         * Enable/disable CSS animations
         */
        this.animate = true;
        /**
         * Enable/disable CSS animations while moving the slider
         */
        this.animateOnMove = false;
    }
    return Options;
}());
/**
 * Slider options
 */
export { Options };
if (false) {
    /**
     * Minimum value for a slider.
     * Not applicable when using stepsArray.
     * @type {?}
     */
    Options.prototype.floor;
    /**
     * Maximum value for a slider.
     * Not applicable when using stepsArray.
     * @type {?}
     */
    Options.prototype.ceil;
    /**
     * Step between each value.
     * Not applicable when using stepsArray.
     * @type {?}
     */
    Options.prototype.step;
    /**
     * The minimum range authorized on the slider.
     * Applies to range slider only.
     * When using stepsArray, expressed as index into stepsArray.
     * @type {?}
     */
    Options.prototype.minRange;
    /**
     * The maximum range authorized on the slider.
     * Applies to range slider only.
     * When using stepsArray, expressed as index into stepsArray.
     * @type {?}
     */
    Options.prototype.maxRange;
    /**
     * Set to true to have a push behavior. When the min handle goes above the max,
     * the max is moved as well (and vice-versa). The range between min and max is
     * defined by the step option (defaults to 1) and can also be overriden by
     * the minRange option. Applies to range slider only.
     * @type {?}
     */
    Options.prototype.pushRange;
    /**
     * The minimum value authorized on the slider.
     * When using stepsArray, expressed as index into stepsArray.
     * @type {?}
     */
    Options.prototype.minLimit;
    /**
     * The maximum value authorized on the slider.
     * When using stepsArray, expressed as index into stepsArray.
     * @type {?}
     */
    Options.prototype.maxLimit;
    /**
     * Custom translate function. Use this if you want to translate values displayed
     * on the slider.
     * @type {?}
     */
    Options.prototype.translate;
    /**
     * Custom function for combining overlapping labels in range slider.
     * It takes the min and max values (already translated with translate fuction)
     * and should return how these two values should be combined.
     * If not provided, the default function will join the two values with
     * ' - ' as separator.
     * @type {?}
     */
    Options.prototype.combineLabels;
    /**
     * Use to display legend under ticks (thus, it needs to be used along with
     * showTicks or showTicksValues). The function will be called with each tick
     * value and returned content will be displayed under the tick as a legend.
     * If the returned value is null, then no legend is displayed under
     * the corresponding tick.You can also directly provide the legend values
     * in the stepsArray option.
     * @type {?}
     */
    Options.prototype.getLegend;
    /**
     * Use to display a custom legend of a stepItem from stepsArray.
     * It will be the same as getLegen but for stepsArray.
     * @type {?}
     */
    Options.prototype.getStepLegend;
    /**
     * If you want to display a slider with non linear/number steps.
     * Just pass an array with each slider value and that's it; the floor, ceil and step settings
     * of the slider will be computed automatically.
     * By default, the value model and valueHigh model values will be the value of the selected item
     * in the stepsArray.
     * They can also be bound to the index of the selected item by setting the bindIndexForStepsArray
     * option to true.
     * @type {?}
     */
    Options.prototype.stepsArray;
    /**
     * Set to true to bind the index of the selected item to value model and valueHigh model.
     * @type {?}
     */
    Options.prototype.bindIndexForStepsArray;
    /**
     * When set to true and using a range slider, the range can be dragged by the selection bar.
     * Applies to range slider only.
     * @type {?}
     */
    Options.prototype.draggableRange;
    /**
     * Same as draggableRange but the slider range can't be changed.
     * Applies to range slider only.
     * @type {?}
     */
    Options.prototype.draggableRangeOnly;
    /**
     * Set to true to always show the selection bar before the slider handle.
     * @type {?}
     */
    Options.prototype.showSelectionBar;
    /**
     * Set to true to always show the selection bar after the slider handle.
     * @type {?}
     */
    Options.prototype.showSelectionBarEnd;
    /**
     * Set a number to draw the selection bar between this value and the slider handle.
     * When using stepsArray, expressed as index into stepsArray.
     * @type {?}
     */
    Options.prototype.showSelectionBarFromValue;
    /**
     * Only for range slider. Set to true to visualize in different colour the areas
     * on the left/right (top/bottom for vertical range slider) of selection bar between the handles.
     * @type {?}
     */
    Options.prototype.showOuterSelectionBars;
    /**
     * Set to true to hide pointer labels
     * @type {?}
     */
    Options.prototype.hidePointerLabels;
    /**
     * Set to true to hide min / max labels
     * @type {?}
     */
    Options.prototype.hideLimitLabels;
    /**
     * Set to false to disable the auto-hiding behavior of the limit labels.
     * @type {?}
     */
    Options.prototype.autoHideLimitLabels;
    /**
     * Set to true to make the slider read-only.
     * @type {?}
     */
    Options.prototype.readOnly;
    /**
     * Set to true to disable the slider.
     * @type {?}
     */
    Options.prototype.disabled;
    /**
     * Throttle interval for mouse events in milliseconds.
     * This is provided to avoid a flood of events when moving the slider with mouse.
     * @type {?}
     */
    Options.prototype.mouseEventsInterval;
    /**
     * Throttle interval for touch events in milliseconds.
     * This is provided to avoid a flood of events when moving the slider with touch gesture.
     * @type {?}
     */
    Options.prototype.touchEventsInterval;
    /**
     * Throttle interval for input changes (changes to bindings or reactive form inputs)
     * This is provided to avoid a flood of events on frequent input binding changes affecting performance.
     * @type {?}
     */
    Options.prototype.inputEventsInterval;
    /**
     * Throttle interval for output changes (signalling changes to output bindings and user callbacks)
     * This is provided to avoid a flood of outgoing events affecting Angular app performance.
     * @type {?}
     */
    Options.prototype.outputEventsInterval;
    /**
     * Set to true to display a tick for each step of the slider.
     * @type {?}
     */
    Options.prototype.showTicks;
    /**
     * Set to true to display a tick and the step value for each step of the slider..
     * @type {?}
     */
    Options.prototype.showTicksValues;
    /** @type {?} */
    Options.prototype.tickStep;
    /** @type {?} */
    Options.prototype.tickValueStep;
    /**
     * Use to display ticks at specific positions.
     * The array contains the index of the ticks that should be displayed.
     * For example, [0, 1, 5] will display a tick for the first, second and sixth values.
     * @type {?}
     */
    Options.prototype.ticksArray;
    /**
     * Used to display a tooltip when a tick is hovered.
     * Set to a function that returns the tooltip content for a given value.
     * @type {?}
     */
    Options.prototype.ticksTooltip;
    /**
     * Same as ticksTooltip but for ticks values.
     * @type {?}
     */
    Options.prototype.ticksValuesTooltip;
    /**
     * Set to true to display the slider vertically.
     * The slider will take the full height of its parent.
     * Changing this value at runtime is not currently supported.
     * @type {?}
     */
    Options.prototype.vertical;
    /**
     * Function that returns the current color of the selection bar.
     * If your color won't change, don't use this option but set it through CSS.
     * If the returned color depends on a model value (either value or valueHigh),
     * you should use the argument passed to the function.
     * Indeed, when the function is called, there is no certainty that the model
     * has already been updated.
     * @type {?}
     */
    Options.prototype.getSelectionBarColor;
    /**
     * Function that returns the color of a tick. showTicks must be enabled.
     * @type {?}
     */
    Options.prototype.getTickColor;
    /**
     * Function that returns the current color of a pointer.
     * If your color won't change, don't use this option but set it through CSS.
     * If the returned color depends on a model value (either value or valueHigh),
     * you should use the argument passed to the function.
     * Indeed, when the function is called, there is no certainty that the model has already been updated.
     * To handle range slider pointers independently, you should evaluate pointerType within the given
     * function where "min" stands for value model and "max" for valueHigh model values.
     * @type {?}
     */
    Options.prototype.getPointerColor;
    /**
     * Handles are focusable (on click or with tab) and can be modified using the following keyboard controls:
     * Left/bottom arrows: -1
     * Right/top arrows: +1
     * Page-down: -10%
     * Page-up: +10%
     * Home: minimum value
     * End: maximum value
     * @type {?}
     */
    Options.prototype.keyboardSupport;
    /**
     * If you display the slider in an element that uses transform: scale(0.5), set the scale value to 2
     * so that the slider is rendered properly and the events are handled correctly.
     * @type {?}
     */
    Options.prototype.scale;
    /**
     * Set to true to force the value(s) to be rounded to the step, even when modified from the outside.
     * When set to false, if the model values are modified from outside the slider, they are not rounded
     * and can be between two steps.
     * @type {?}
     */
    Options.prototype.enforceStep;
    /**
     * Set to true to force the value(s) to be normalised to allowed range (floor to ceil), even when modified from the outside.
     * When set to false, if the model values are modified from outside the slider, and they are outside allowed range,
     * the slider may be rendered incorrectly. However, setting this to false may be useful if you want to perform custom normalisation.
     * @type {?}
     */
    Options.prototype.enforceRange;
    /**
     * Set to true to force the value(s) to be rounded to the nearest step value, even when modified from the outside.
     * When set to false, if the model values are modified from outside the slider, and they are outside allowed range,
     * the slider may be rendered incorrectly. However, setting this to false may be useful if you want to perform custom normalisation.
     * @type {?}
     */
    Options.prototype.enforceStepsArray;
    /**
     * Set to true to prevent to user from switching the min and max handles. Applies to range slider only.
     * @type {?}
     */
    Options.prototype.noSwitching;
    /**
     * Set to true to only bind events on slider handles.
     * @type {?}
     */
    Options.prototype.onlyBindHandles;
    /**
     * Set to true to show graphs right to left.
     * If vertical is true it will be from top to bottom and left / right arrow functions reversed.
     * @type {?}
     */
    Options.prototype.rightToLeft;
    /**
     * Set to true to reverse keyboard navigation:
     * Right/top arrows: -1
     * Left/bottom arrows: +1
     * Page-up: -10%
     * Page-down: +10%
     * End: minimum value
     * Home: maximum value
     * @type {?}
     */
    Options.prototype.reversedControls;
    /**
     * Set to true to keep the slider labels inside the slider bounds.
     * @type {?}
     */
    Options.prototype.boundPointerLabels;
    /**
     * Set to true to use a logarithmic scale to display the slider.
     * @type {?}
     */
    Options.prototype.logScale;
    /**
     * Function that returns the position on the slider for a given value.
     * The position must be a percentage between 0 and 1.
     * The function should be monotonically increasing or decreasing; otherwise the slider may behave incorrectly.
     * @type {?}
     */
    Options.prototype.customValueToPosition;
    /**
     * Function that returns the value for a given position on the slider.
     * The position is a percentage between 0 and 1.
     * The function should be monotonically increasing or decreasing; otherwise the slider may behave incorrectly.
     * @type {?}
     */
    Options.prototype.customPositionToValue;
    /**
     * Precision limit for calculated values.
     * Values used in calculations will be rounded to this number of significant digits
     * to prevent accumulating small floating-point errors.
     * @type {?}
     */
    Options.prototype.precisionLimit;
    /**
     * Use to display the selection bar as a gradient.
     * The given object must contain from and to properties which are colors.
     * @type {?}
     */
    Options.prototype.selectionBarGradient;
    /**
     * Use to add a label directly to the slider for accessibility. Adds the aria-label attribute.
     * @type {?}
     */
    Options.prototype.ariaLabel;
    /**
     * Use instead of ariaLabel to reference the id of an element which will be used to label the slider.
     * Adds the aria-labelledby attribute.
     * @type {?}
     */
    Options.prototype.ariaLabelledBy;
    /**
     * Use to add a label directly to the slider range for accessibility. Adds the aria-label attribute.
     * @type {?}
     */
    Options.prototype.ariaLabelHigh;
    /**
     * Use instead of ariaLabelHigh to reference the id of an element which will be used to label the slider range.
     * Adds the aria-labelledby attribute.
     * @type {?}
     */
    Options.prototype.ariaLabelledByHigh;
    /**
     * Use to increase rendering performance. If the value is not provided, the slider calculates the with/height of the handle
     * @type {?}
     */
    Options.prototype.handleDimension;
    /**
     * Use to increase rendering performance. If the value is not provided, the slider calculates the with/height of the bar
     * @type {?}
     */
    Options.prototype.barDimension;
    /**
     * Enable/disable CSS animations
     * @type {?}
     */
    Options.prototype.animate;
    /**
     * Enable/disable CSS animations while moving the slider
     * @type {?}
     */
    Options.prototype.animateOnMove;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXNsaWRlci9uZ3gtc2xpZGVyLyIsInNvdXJjZXMiOlsib3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0lBS0UsTUFBRzs7SUFFSCxPQUFJOztJQUVKLFFBQUs7O0lBRUwsT0FBSTs7SUFFSixZQUFTOzs7b0JBUlQsR0FBRztvQkFFSCxJQUFJO29CQUVKLEtBQUs7b0JBRUwsSUFBSTtvQkFFSixTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4Qlg7OztBQUFBOzs7Ozs7cUJBR21CLENBQUM7Ozs7O29CQUlGLElBQUk7Ozs7O29CQUlKLENBQUM7Ozs7Ozt3QkFLRyxJQUFJOzs7Ozs7d0JBS0osSUFBSTs7Ozs7Ozt5QkFNRixLQUFLOzs7Ozt3QkFJUCxJQUFJOzs7Ozt3QkFJSixJQUFJOzs7Ozt5QkFJUSxJQUFJOzs7Ozs7Ozs2QkFPSSxJQUFJOzs7Ozs7Ozs7eUJBUVosSUFBSTs7Ozs7NkJBSUksSUFBSTs7Ozs7Ozs7OzswQkFTTixJQUFJOzs7O3NDQUdQLEtBQUs7Ozs7OzhCQUliLEtBQUs7Ozs7O2tDQUlELEtBQUs7Ozs7Z0NBR1AsS0FBSzs7OzttQ0FHRixLQUFLOzs7Ozt5Q0FJQSxJQUFJOzs7OztzQ0FJTixLQUFLOzs7O2lDQUdWLEtBQUs7Ozs7K0JBR1AsS0FBSzs7OzttQ0FHRCxJQUFJOzs7O3dCQUdmLEtBQUs7Ozs7d0JBR0wsS0FBSzs7Ozs7bUNBSUssRUFBRTs7Ozs7bUNBSUYsRUFBRTs7Ozs7bUNBSUYsR0FBRzs7Ozs7b0NBSUYsR0FBRzs7Ozt5QkFHYixLQUFLOzs7OytCQUdDLEtBQUs7Ozt3QkFJYixJQUFJOzs7NkJBSUMsSUFBSTs7Ozs7OzBCQUtMLElBQUk7Ozs7OzRCQUllLElBQUk7Ozs7a0NBR0UsSUFBSTs7Ozs7O3dCQUtoQyxLQUFLOzs7Ozs7Ozs7b0NBUStDLElBQUk7Ozs7NEJBR2xDLElBQUk7Ozs7Ozs7Ozs7K0JBU3lCLElBQUk7Ozs7Ozs7Ozs7K0JBVWhELElBQUk7Ozs7O3FCQUlmLENBQUM7Ozs7OzsyQkFLTSxJQUFJOzs7Ozs7NEJBS0gsSUFBSTs7Ozs7O2lDQUtDLElBQUk7Ozs7MkJBR1YsS0FBSzs7OzsrQkFHRCxLQUFLOzs7OzsyQkFJVCxLQUFLOzs7Ozs7Ozs7O2dDQVVBLEtBQUs7Ozs7a0NBR0gsSUFBSTs7Ozt3QkFHZCxLQUFLOzs7Ozs7cUNBS3dCLElBQUk7Ozs7OztxQ0FLSixJQUFJOzs7Ozs7OEJBSzVCLEVBQUU7Ozs7O29DQUl3QixJQUFJOzs7O3lCQUduQyxJQUFJOzs7Ozs4QkFJQyxJQUFJOzs7OzZCQUdMLElBQUk7Ozs7O2tDQUlDLElBQUk7Ozs7K0JBR1AsSUFBSTs7Ozs0QkFHUCxJQUFJOzs7O3VCQUdSLElBQUk7Ozs7NkJBR0UsS0FBSzs7a0JBN1RqQztJQThUQyxDQUFBOzs7O0FBblJELG1CQW1SQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvaW50ZXJUeXBlIH0gZnJvbSAnLi9wb2ludGVyLXR5cGUnO1xuXG4vKiogTGFiZWwgdHlwZSAqL1xuZXhwb3J0IGVudW0gTGFiZWxUeXBlIHtcbiAgLyoqIExhYmVsIGFib3ZlIGxvdyBwb2ludGVyICovXG4gIExvdyxcbiAgLyoqIExhYmVsIGFib3ZlIGhpZ2ggcG9pbnRlciAqL1xuICBIaWdoLFxuICAvKiogTGFiZWwgZm9yIG1pbmltdW0gc2xpZGVyIHZhbHVlICovXG4gIEZsb29yLFxuICAvKiogTGFiZWwgZm9yIG1heGltdW0gc2xpZGVyIHZhbHVlICovXG4gIENlaWwsXG4gIC8qKiBMYWJlbCBiZWxvdyBsZWdlbmQgdGljayAqL1xuICBUaWNrVmFsdWVcbn1cblxuLyoqIEZ1bmN0aW9uIHRvIHRyYW5zbGF0ZSBsYWJlbCB2YWx1ZSBpbnRvIHRleHQgKi9cbmV4cG9ydCB0eXBlIFRyYW5zbGF0ZUZ1bmN0aW9uID0gKHZhbHVlOiBudW1iZXIsIGxhYmVsOiBMYWJlbFR5cGUpID0+IHN0cmluZztcbi8qKiBGdW5jdGlvbiB0byBjb21iaW5kICovXG5leHBvcnQgdHlwZSBDb21iaW5lTGFiZWxzRnVuY3Rpb24gPSAobWluTGFiZWw6IHN0cmluZywgbWF4TGFiZWw6IHN0cmluZykgPT4gc3RyaW5nO1xuLyoqIEZ1bmN0aW9uIHRvIHByb3ZpZGUgbGVnZW5kICAqL1xuZXhwb3J0IHR5cGUgR2V0TGVnZW5kRnVuY3Rpb24gPSAodmFsdWU6IG51bWJlcikgPT4gc3RyaW5nO1xuZXhwb3J0IHR5cGUgR2V0U3RlcExlZ2VuZEZ1bmN0aW9uID0gKHN0ZXA6IEN1c3RvbVN0ZXBEZWZpbml0aW9uKSA9PiBzdHJpbmc7XG5cbi8qKiBGdW5jdGlvbiBjb252ZXJ0aW5nIHNsaWRlciB2YWx1ZSB0byBzbGlkZXIgcG9zaXRpb24gKi9cbmV4cG9ydCB0eXBlIFZhbHVlVG9Qb3NpdGlvbkZ1bmN0aW9uID0gKHZhbDogbnVtYmVyLCBtaW5WYWw6IG51bWJlciwgbWF4VmFsOiBudW1iZXIpID0+IG51bWJlcjtcblxuLyoqIEZ1bmN0aW9uIGNvbnZlcnRpbmcgc2xpZGVyIHBvc2l0aW9uIHRvIHNsaWRlciB2YWx1ZSAqL1xuZXhwb3J0IHR5cGUgUG9zaXRpb25Ub1ZhbHVlRnVuY3Rpb24gPSAocGVyY2VudDogbnVtYmVyLCBtaW5WYWw6IG51bWJlciwgbWF4VmFsOiBudW1iZXIpID0+IG51bWJlcjtcblxuLyoqXG4gKiBDdXN0b20gc3RlcCBkZWZpbml0aW9uXG4gKlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBzcGVjaWZ5IGN1c3RvbSB2YWx1ZXMgYW5kIGxlZ2VuZCB2YWx1ZXMgZm9yIHNsaWRlciB0aWNrc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbVN0ZXBEZWZpbml0aW9uIHtcbiAgLyoqIFZhbHVlICovXG4gIHZhbHVlOiBudW1iZXI7XG4gIC8qKiBMZWdlbmQgKGxhYmVsIGZvciB0aGUgdmFsdWUpICovXG4gIGxlZ2VuZD86IHN0cmluZztcbn1cblxuLyoqIFNsaWRlciBvcHRpb25zICovXG5leHBvcnQgY2xhc3MgT3B0aW9ucyB7XG4gIC8qKiBNaW5pbXVtIHZhbHVlIGZvciBhIHNsaWRlci5cbiAgICBOb3QgYXBwbGljYWJsZSB3aGVuIHVzaW5nIHN0ZXBzQXJyYXkuICovXG4gIGZsb29yPzogbnVtYmVyID0gMDtcblxuICAvKiogTWF4aW11bSB2YWx1ZSBmb3IgYSBzbGlkZXIuXG4gICAgTm90IGFwcGxpY2FibGUgd2hlbiB1c2luZyBzdGVwc0FycmF5LiAqL1xuICBjZWlsPzogbnVtYmVyID0gbnVsbDtcblxuICAvKiogU3RlcCBiZXR3ZWVuIGVhY2ggdmFsdWUuXG4gICAgTm90IGFwcGxpY2FibGUgd2hlbiB1c2luZyBzdGVwc0FycmF5LiAqL1xuICBzdGVwPzogbnVtYmVyID0gMTtcblxuICAvKiogVGhlIG1pbmltdW0gcmFuZ2UgYXV0aG9yaXplZCBvbiB0aGUgc2xpZGVyLlxuICAgIEFwcGxpZXMgdG8gcmFuZ2Ugc2xpZGVyIG9ubHkuXG4gICAgV2hlbiB1c2luZyBzdGVwc0FycmF5LCBleHByZXNzZWQgYXMgaW5kZXggaW50byBzdGVwc0FycmF5LiAqL1xuICBtaW5SYW5nZT86IG51bWJlciA9IG51bGw7XG5cbiAgLyoqIFRoZSBtYXhpbXVtIHJhbmdlIGF1dGhvcml6ZWQgb24gdGhlIHNsaWRlci5cbiAgICBBcHBsaWVzIHRvIHJhbmdlIHNsaWRlciBvbmx5LlxuICAgIFdoZW4gdXNpbmcgc3RlcHNBcnJheSwgZXhwcmVzc2VkIGFzIGluZGV4IGludG8gc3RlcHNBcnJheS4gKi9cbiAgbWF4UmFuZ2U/OiBudW1iZXIgPSBudWxsO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBoYXZlIGEgcHVzaCBiZWhhdmlvci4gV2hlbiB0aGUgbWluIGhhbmRsZSBnb2VzIGFib3ZlIHRoZSBtYXgsXG4gICAgdGhlIG1heCBpcyBtb3ZlZCBhcyB3ZWxsIChhbmQgdmljZS12ZXJzYSkuIFRoZSByYW5nZSBiZXR3ZWVuIG1pbiBhbmQgbWF4IGlzXG4gICAgZGVmaW5lZCBieSB0aGUgc3RlcCBvcHRpb24gKGRlZmF1bHRzIHRvIDEpIGFuZCBjYW4gYWxzbyBiZSBvdmVycmlkZW4gYnlcbiAgICB0aGUgbWluUmFuZ2Ugb3B0aW9uLiBBcHBsaWVzIHRvIHJhbmdlIHNsaWRlciBvbmx5LiAqL1xuICBwdXNoUmFuZ2U/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFRoZSBtaW5pbXVtIHZhbHVlIGF1dGhvcml6ZWQgb24gdGhlIHNsaWRlci5cbiAgICBXaGVuIHVzaW5nIHN0ZXBzQXJyYXksIGV4cHJlc3NlZCBhcyBpbmRleCBpbnRvIHN0ZXBzQXJyYXkuICovXG4gIG1pbkxpbWl0PzogbnVtYmVyID0gbnVsbDtcblxuICAvKiogVGhlIG1heGltdW0gdmFsdWUgYXV0aG9yaXplZCBvbiB0aGUgc2xpZGVyLlxuICAgIFdoZW4gdXNpbmcgc3RlcHNBcnJheSwgZXhwcmVzc2VkIGFzIGluZGV4IGludG8gc3RlcHNBcnJheS4gKi9cbiAgbWF4TGltaXQ/OiBudW1iZXIgPSBudWxsO1xuXG4gIC8qKiBDdXN0b20gdHJhbnNsYXRlIGZ1bmN0aW9uLiBVc2UgdGhpcyBpZiB5b3Ugd2FudCB0byB0cmFuc2xhdGUgdmFsdWVzIGRpc3BsYXllZFxuICAgICAgb24gdGhlIHNsaWRlci4gKi9cbiAgdHJhbnNsYXRlPzogVHJhbnNsYXRlRnVuY3Rpb24gPSBudWxsO1xuXG4gIC8qKiBDdXN0b20gZnVuY3Rpb24gZm9yIGNvbWJpbmluZyBvdmVybGFwcGluZyBsYWJlbHMgaW4gcmFuZ2Ugc2xpZGVyLlxuICAgICAgSXQgdGFrZXMgdGhlIG1pbiBhbmQgbWF4IHZhbHVlcyAoYWxyZWFkeSB0cmFuc2xhdGVkIHdpdGggdHJhbnNsYXRlIGZ1Y3Rpb24pXG4gICAgICBhbmQgc2hvdWxkIHJldHVybiBob3cgdGhlc2UgdHdvIHZhbHVlcyBzaG91bGQgYmUgY29tYmluZWQuXG4gICAgICBJZiBub3QgcHJvdmlkZWQsIHRoZSBkZWZhdWx0IGZ1bmN0aW9uIHdpbGwgam9pbiB0aGUgdHdvIHZhbHVlcyB3aXRoXG4gICAgICAnIC0gJyBhcyBzZXBhcmF0b3IuICovXG4gIGNvbWJpbmVMYWJlbHM/OiBDb21iaW5lTGFiZWxzRnVuY3Rpb24gPSBudWxsO1xuXG4gIC8qKiBVc2UgdG8gZGlzcGxheSBsZWdlbmQgdW5kZXIgdGlja3MgKHRodXMsIGl0IG5lZWRzIHRvIGJlIHVzZWQgYWxvbmcgd2l0aFxuICAgICBzaG93VGlja3Mgb3Igc2hvd1RpY2tzVmFsdWVzKS4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdpdGggZWFjaCB0aWNrXG4gICAgIHZhbHVlIGFuZCByZXR1cm5lZCBjb250ZW50IHdpbGwgYmUgZGlzcGxheWVkIHVuZGVyIHRoZSB0aWNrIGFzIGEgbGVnZW5kLlxuICAgICBJZiB0aGUgcmV0dXJuZWQgdmFsdWUgaXMgbnVsbCwgdGhlbiBubyBsZWdlbmQgaXMgZGlzcGxheWVkIHVuZGVyXG4gICAgIHRoZSBjb3JyZXNwb25kaW5nIHRpY2suWW91IGNhbiBhbHNvIGRpcmVjdGx5IHByb3ZpZGUgdGhlIGxlZ2VuZCB2YWx1ZXNcbiAgICAgaW4gdGhlIHN0ZXBzQXJyYXkgb3B0aW9uLiAqL1xuICBnZXRMZWdlbmQ/OiBHZXRMZWdlbmRGdW5jdGlvbiA9IG51bGw7XG5cbiAgIC8qKiBVc2UgdG8gZGlzcGxheSBhIGN1c3RvbSBsZWdlbmQgb2YgYSBzdGVwSXRlbSBmcm9tIHN0ZXBzQXJyYXkuXG4gICAgSXQgd2lsbCBiZSB0aGUgc2FtZSBhcyBnZXRMZWdlbiBidXQgZm9yIHN0ZXBzQXJyYXkuICovXG4gIGdldFN0ZXBMZWdlbmQ/OiBHZXRTdGVwTGVnZW5kRnVuY3Rpb24gPSBudWxsO1xuXG4gIC8qKiBJZiB5b3Ugd2FudCB0byBkaXNwbGF5IGEgc2xpZGVyIHdpdGggbm9uIGxpbmVhci9udW1iZXIgc3RlcHMuXG4gICAgIEp1c3QgcGFzcyBhbiBhcnJheSB3aXRoIGVhY2ggc2xpZGVyIHZhbHVlIGFuZCB0aGF0J3MgaXQ7IHRoZSBmbG9vciwgY2VpbCBhbmQgc3RlcCBzZXR0aW5nc1xuICAgICBvZiB0aGUgc2xpZGVyIHdpbGwgYmUgY29tcHV0ZWQgYXV0b21hdGljYWxseS5cbiAgICAgQnkgZGVmYXVsdCwgdGhlIHZhbHVlIG1vZGVsIGFuZCB2YWx1ZUhpZ2ggbW9kZWwgdmFsdWVzIHdpbGwgYmUgdGhlIHZhbHVlIG9mIHRoZSBzZWxlY3RlZCBpdGVtXG4gICAgIGluIHRoZSBzdGVwc0FycmF5LlxuICAgICBUaGV5IGNhbiBhbHNvIGJlIGJvdW5kIHRvIHRoZSBpbmRleCBvZiB0aGUgc2VsZWN0ZWQgaXRlbSBieSBzZXR0aW5nIHRoZSBiaW5kSW5kZXhGb3JTdGVwc0FycmF5XG4gICAgIG9wdGlvbiB0byB0cnVlLiAqL1xuICBzdGVwc0FycmF5PzogQ3VzdG9tU3RlcERlZmluaXRpb25bXSA9IG51bGw7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIGJpbmQgdGhlIGluZGV4IG9mIHRoZSBzZWxlY3RlZCBpdGVtIHRvIHZhbHVlIG1vZGVsIGFuZCB2YWx1ZUhpZ2ggbW9kZWwuICovXG4gIGJpbmRJbmRleEZvclN0ZXBzQXJyYXk/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZW4gc2V0IHRvIHRydWUgYW5kIHVzaW5nIGEgcmFuZ2Ugc2xpZGVyLCB0aGUgcmFuZ2UgY2FuIGJlIGRyYWdnZWQgYnkgdGhlIHNlbGVjdGlvbiBiYXIuXG4gICAgQXBwbGllcyB0byByYW5nZSBzbGlkZXIgb25seS4gKi9cbiAgZHJhZ2dhYmxlUmFuZ2U/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFNhbWUgYXMgZHJhZ2dhYmxlUmFuZ2UgYnV0IHRoZSBzbGlkZXIgcmFuZ2UgY2FuJ3QgYmUgY2hhbmdlZC5cbiAgICBBcHBsaWVzIHRvIHJhbmdlIHNsaWRlciBvbmx5LiAqL1xuICBkcmFnZ2FibGVSYW5nZU9ubHk/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIGFsd2F5cyBzaG93IHRoZSBzZWxlY3Rpb24gYmFyIGJlZm9yZSB0aGUgc2xpZGVyIGhhbmRsZS4gKi9cbiAgc2hvd1NlbGVjdGlvbkJhcj86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gYWx3YXlzIHNob3cgdGhlIHNlbGVjdGlvbiBiYXIgYWZ0ZXIgdGhlIHNsaWRlciBoYW5kbGUuICovXG4gIHNob3dTZWxlY3Rpb25CYXJFbmQ/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqICBTZXQgYSBudW1iZXIgdG8gZHJhdyB0aGUgc2VsZWN0aW9uIGJhciBiZXR3ZWVuIHRoaXMgdmFsdWUgYW5kIHRoZSBzbGlkZXIgaGFuZGxlLlxuICAgIFdoZW4gdXNpbmcgc3RlcHNBcnJheSwgZXhwcmVzc2VkIGFzIGluZGV4IGludG8gc3RlcHNBcnJheS4gKi9cbiAgc2hvd1NlbGVjdGlvbkJhckZyb21WYWx1ZT86IG51bWJlciA9IG51bGw7XG5cbiAgLyoqICBPbmx5IGZvciByYW5nZSBzbGlkZXIuIFNldCB0byB0cnVlIHRvIHZpc3VhbGl6ZSBpbiBkaWZmZXJlbnQgY29sb3VyIHRoZSBhcmVhc1xuICAgIG9uIHRoZSBsZWZ0L3JpZ2h0ICh0b3AvYm90dG9tIGZvciB2ZXJ0aWNhbCByYW5nZSBzbGlkZXIpIG9mIHNlbGVjdGlvbiBiYXIgYmV0d2VlbiB0aGUgaGFuZGxlcy4gKi9cbiAgc2hvd091dGVyU2VsZWN0aW9uQmFycz86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gaGlkZSBwb2ludGVyIGxhYmVscyAqL1xuICBoaWRlUG9pbnRlckxhYmVscz86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gaGlkZSBtaW4gLyBtYXggbGFiZWxzICAqL1xuICBoaWRlTGltaXRMYWJlbHM/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHRoZSBhdXRvLWhpZGluZyBiZWhhdmlvciBvZiB0aGUgbGltaXQgbGFiZWxzLiAqL1xuICBhdXRvSGlkZUxpbWl0TGFiZWxzPzogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIG1ha2UgdGhlIHNsaWRlciByZWFkLW9ubHkuICovXG4gIHJlYWRPbmx5PzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBkaXNhYmxlIHRoZSBzbGlkZXIuICovXG4gIGRpc2FibGVkPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBUaHJvdHRsZSBpbnRlcnZhbCBmb3IgbW91c2UgZXZlbnRzIGluIG1pbGxpc2Vjb25kcy5cbiAgICogVGhpcyBpcyBwcm92aWRlZCB0byBhdm9pZCBhIGZsb29kIG9mIGV2ZW50cyB3aGVuIG1vdmluZyB0aGUgc2xpZGVyIHdpdGggbW91c2UuICovXG4gIG1vdXNlRXZlbnRzSW50ZXJ2YWw/OiBudW1iZXIgPSA1MDtcblxuICAvKiogVGhyb3R0bGUgaW50ZXJ2YWwgZm9yIHRvdWNoIGV2ZW50cyBpbiBtaWxsaXNlY29uZHMuXG4gICAqIFRoaXMgaXMgcHJvdmlkZWQgdG8gYXZvaWQgYSBmbG9vZCBvZiBldmVudHMgd2hlbiBtb3ZpbmcgdGhlIHNsaWRlciB3aXRoIHRvdWNoIGdlc3R1cmUuICovXG4gIHRvdWNoRXZlbnRzSW50ZXJ2YWw/OiBudW1iZXIgPSA1MDtcblxuICAvKiogVGhyb3R0bGUgaW50ZXJ2YWwgZm9yIGlucHV0IGNoYW5nZXMgKGNoYW5nZXMgdG8gYmluZGluZ3Mgb3IgcmVhY3RpdmUgZm9ybSBpbnB1dHMpXG4gICAqIFRoaXMgaXMgcHJvdmlkZWQgdG8gYXZvaWQgYSBmbG9vZCBvZiBldmVudHMgb24gZnJlcXVlbnQgaW5wdXQgYmluZGluZyBjaGFuZ2VzIGFmZmVjdGluZyBwZXJmb3JtYW5jZS4gKi9cbiAgaW5wdXRFdmVudHNJbnRlcnZhbD86IG51bWJlciA9IDEwMDtcblxuICAvKiogVGhyb3R0bGUgaW50ZXJ2YWwgZm9yIG91dHB1dCBjaGFuZ2VzIChzaWduYWxsaW5nIGNoYW5nZXMgdG8gb3V0cHV0IGJpbmRpbmdzIGFuZCB1c2VyIGNhbGxiYWNrcylcbiAgICogVGhpcyBpcyBwcm92aWRlZCB0byBhdm9pZCBhIGZsb29kIG9mIG91dGdvaW5nIGV2ZW50cyBhZmZlY3RpbmcgQW5ndWxhciBhcHAgcGVyZm9ybWFuY2UuICovXG4gIG91dHB1dEV2ZW50c0ludGVydmFsPzogbnVtYmVyID0gMTAwO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBkaXNwbGF5IGEgdGljayBmb3IgZWFjaCBzdGVwIG9mIHRoZSBzbGlkZXIuICovXG4gIHNob3dUaWNrcz86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gZGlzcGxheSBhIHRpY2sgYW5kIHRoZSBzdGVwIHZhbHVlIGZvciBlYWNoIHN0ZXAgb2YgdGhlIHNsaWRlci4uICovXG4gIHNob3dUaWNrc1ZhbHVlcz86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiBUaGUgc3RlcCBiZXR3ZWVuIGVhY2ggdGljayB0byBkaXNwbGF5LiBJZiBub3Qgc2V0LCB0aGUgc3RlcCB2YWx1ZSBpcyB1c2VkLlxuICAgIE5vdCB1c2VkIHdoZW4gdGlja3NBcnJheSBpcyBzcGVjaWZpZWQuICovXG4gIHRpY2tTdGVwPzogbnVtYmVyID0gbnVsbDtcblxuICAvKiBUaGUgc3RlcCBiZXR3ZWVuIGRpc3BsYXlpbmcgZWFjaCB0aWNrIHN0ZXAgdmFsdWUuXG4gICAgSWYgbm90IHNldCwgdGhlbiB0aWNrU3RlcCBvciBzdGVwIGlzIHVzZWQsIGRlcGVuZGluZyBvbiB3aGljaCBvbmUgaXMgc2V0LiAqL1xuICB0aWNrVmFsdWVTdGVwPzogbnVtYmVyID0gbnVsbDtcblxuICAvKiogVXNlIHRvIGRpc3BsYXkgdGlja3MgYXQgc3BlY2lmaWMgcG9zaXRpb25zLlxuICAgIFRoZSBhcnJheSBjb250YWlucyB0aGUgaW5kZXggb2YgdGhlIHRpY2tzIHRoYXQgc2hvdWxkIGJlIGRpc3BsYXllZC5cbiAgICBGb3IgZXhhbXBsZSwgWzAsIDEsIDVdIHdpbGwgZGlzcGxheSBhIHRpY2sgZm9yIHRoZSBmaXJzdCwgc2Vjb25kIGFuZCBzaXh0aCB2YWx1ZXMuICovXG4gIHRpY2tzQXJyYXk/OiBudW1iZXJbXSA9IG51bGw7XG5cbiAgLyoqIFVzZWQgdG8gZGlzcGxheSBhIHRvb2x0aXAgd2hlbiBhIHRpY2sgaXMgaG92ZXJlZC5cbiAgICBTZXQgdG8gYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHRvb2x0aXAgY29udGVudCBmb3IgYSBnaXZlbiB2YWx1ZS4gKi9cbiAgdGlja3NUb29sdGlwPzogKHZhbHVlOiBudW1iZXIpID0+IHN0cmluZyA9IG51bGw7XG5cbiAgLyoqIFNhbWUgYXMgdGlja3NUb29sdGlwIGJ1dCBmb3IgdGlja3MgdmFsdWVzLiAqL1xuICB0aWNrc1ZhbHVlc1Rvb2x0aXA/OiAodmFsdWU6IG51bWJlcikgPT4gc3RyaW5nID0gbnVsbDtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gZGlzcGxheSB0aGUgc2xpZGVyIHZlcnRpY2FsbHkuXG4gICAgVGhlIHNsaWRlciB3aWxsIHRha2UgdGhlIGZ1bGwgaGVpZ2h0IG9mIGl0cyBwYXJlbnQuXG4gICAgQ2hhbmdpbmcgdGhpcyB2YWx1ZSBhdCBydW50aW1lIGlzIG5vdCBjdXJyZW50bHkgc3VwcG9ydGVkLiAqL1xuICB2ZXJ0aWNhbD86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBjdXJyZW50IGNvbG9yIG9mIHRoZSBzZWxlY3Rpb24gYmFyLlxuICAgIElmIHlvdXIgY29sb3Igd29uJ3QgY2hhbmdlLCBkb24ndCB1c2UgdGhpcyBvcHRpb24gYnV0IHNldCBpdCB0aHJvdWdoIENTUy5cbiAgICBJZiB0aGUgcmV0dXJuZWQgY29sb3IgZGVwZW5kcyBvbiBhIG1vZGVsIHZhbHVlIChlaXRoZXIgdmFsdWUgb3IgdmFsdWVIaWdoKSxcbiAgICB5b3Ugc2hvdWxkIHVzZSB0aGUgYXJndW1lbnQgcGFzc2VkIHRvIHRoZSBmdW5jdGlvbi5cbiAgICBJbmRlZWQsIHdoZW4gdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlcmUgaXMgbm8gY2VydGFpbnR5IHRoYXQgdGhlIG1vZGVsXG4gICAgaGFzIGFscmVhZHkgYmVlbiB1cGRhdGVkLiovXG4gIGdldFNlbGVjdGlvbkJhckNvbG9yPzogKG1pblZhbHVlOiBudW1iZXIsIG1heFZhbHVlPzogbnVtYmVyKSA9PiBzdHJpbmcgPSBudWxsO1xuXG4gIC8qKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGNvbG9yIG9mIGEgdGljay4gc2hvd1RpY2tzIG11c3QgYmUgZW5hYmxlZC4gKi9cbiAgZ2V0VGlja0NvbG9yPzogKHZhbHVlOiBudW1iZXIpID0+IHN0cmluZyA9IG51bGw7XG5cbiAgLyoqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgY3VycmVudCBjb2xvciBvZiBhIHBvaW50ZXIuXG4gICAgSWYgeW91ciBjb2xvciB3b24ndCBjaGFuZ2UsIGRvbid0IHVzZSB0aGlzIG9wdGlvbiBidXQgc2V0IGl0IHRocm91Z2ggQ1NTLlxuICAgIElmIHRoZSByZXR1cm5lZCBjb2xvciBkZXBlbmRzIG9uIGEgbW9kZWwgdmFsdWUgKGVpdGhlciB2YWx1ZSBvciB2YWx1ZUhpZ2gpLFxuICAgIHlvdSBzaG91bGQgdXNlIHRoZSBhcmd1bWVudCBwYXNzZWQgdG8gdGhlIGZ1bmN0aW9uLlxuICAgIEluZGVlZCwgd2hlbiB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkLCB0aGVyZSBpcyBubyBjZXJ0YWludHkgdGhhdCB0aGUgbW9kZWwgaGFzIGFscmVhZHkgYmVlbiB1cGRhdGVkLlxuICAgIFRvIGhhbmRsZSByYW5nZSBzbGlkZXIgcG9pbnRlcnMgaW5kZXBlbmRlbnRseSwgeW91IHNob3VsZCBldmFsdWF0ZSBwb2ludGVyVHlwZSB3aXRoaW4gdGhlIGdpdmVuXG4gICAgZnVuY3Rpb24gd2hlcmUgXCJtaW5cIiBzdGFuZHMgZm9yIHZhbHVlIG1vZGVsIGFuZCBcIm1heFwiIGZvciB2YWx1ZUhpZ2ggbW9kZWwgdmFsdWVzLiAqL1xuICBnZXRQb2ludGVyQ29sb3I/OiAodmFsdWU6IG51bWJlciwgcG9pbnRlclR5cGU6IFBvaW50ZXJUeXBlKSA9PiBzdHJpbmcgPSBudWxsO1xuXG4gIC8qKiBIYW5kbGVzIGFyZSBmb2N1c2FibGUgKG9uIGNsaWNrIG9yIHdpdGggdGFiKSBhbmQgY2FuIGJlIG1vZGlmaWVkIHVzaW5nIHRoZSBmb2xsb3dpbmcga2V5Ym9hcmQgY29udHJvbHM6XG4gICAgTGVmdC9ib3R0b20gYXJyb3dzOiAtMVxuICAgIFJpZ2h0L3RvcCBhcnJvd3M6ICsxXG4gICAgUGFnZS1kb3duOiAtMTAlXG4gICAgUGFnZS11cDogKzEwJVxuICAgIEhvbWU6IG1pbmltdW0gdmFsdWVcbiAgICBFbmQ6IG1heGltdW0gdmFsdWVcbiAgICovXG4gIGtleWJvYXJkU3VwcG9ydD86IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBJZiB5b3UgZGlzcGxheSB0aGUgc2xpZGVyIGluIGFuIGVsZW1lbnQgdGhhdCB1c2VzIHRyYW5zZm9ybTogc2NhbGUoMC41KSwgc2V0IHRoZSBzY2FsZSB2YWx1ZSB0byAyXG4gICAgc28gdGhhdCB0aGUgc2xpZGVyIGlzIHJlbmRlcmVkIHByb3Blcmx5IGFuZCB0aGUgZXZlbnRzIGFyZSBoYW5kbGVkIGNvcnJlY3RseS4gKi9cbiAgc2NhbGU/OiBudW1iZXIgPSAxO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBmb3JjZSB0aGUgdmFsdWUocykgdG8gYmUgcm91bmRlZCB0byB0aGUgc3RlcCwgZXZlbiB3aGVuIG1vZGlmaWVkIGZyb20gdGhlIG91dHNpZGUuXG4gICAgV2hlbiBzZXQgdG8gZmFsc2UsIGlmIHRoZSBtb2RlbCB2YWx1ZXMgYXJlIG1vZGlmaWVkIGZyb20gb3V0c2lkZSB0aGUgc2xpZGVyLCB0aGV5IGFyZSBub3Qgcm91bmRlZFxuICAgIGFuZCBjYW4gYmUgYmV0d2VlbiB0d28gc3RlcHMuICovXG4gIGVuZm9yY2VTdGVwPzogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIGZvcmNlIHRoZSB2YWx1ZShzKSB0byBiZSBub3JtYWxpc2VkIHRvIGFsbG93ZWQgcmFuZ2UgKGZsb29yIHRvIGNlaWwpLCBldmVuIHdoZW4gbW9kaWZpZWQgZnJvbSB0aGUgb3V0c2lkZS5cbiAgICBXaGVuIHNldCB0byBmYWxzZSwgaWYgdGhlIG1vZGVsIHZhbHVlcyBhcmUgbW9kaWZpZWQgZnJvbSBvdXRzaWRlIHRoZSBzbGlkZXIsIGFuZCB0aGV5IGFyZSBvdXRzaWRlIGFsbG93ZWQgcmFuZ2UsXG4gICAgdGhlIHNsaWRlciBtYXkgYmUgcmVuZGVyZWQgaW5jb3JyZWN0bHkuIEhvd2V2ZXIsIHNldHRpbmcgdGhpcyB0byBmYWxzZSBtYXkgYmUgdXNlZnVsIGlmIHlvdSB3YW50IHRvIHBlcmZvcm0gY3VzdG9tIG5vcm1hbGlzYXRpb24uICovXG4gIGVuZm9yY2VSYW5nZT86IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBmb3JjZSB0aGUgdmFsdWUocykgdG8gYmUgcm91bmRlZCB0byB0aGUgbmVhcmVzdCBzdGVwIHZhbHVlLCBldmVuIHdoZW4gbW9kaWZpZWQgZnJvbSB0aGUgb3V0c2lkZS5cbiAgICBXaGVuIHNldCB0byBmYWxzZSwgaWYgdGhlIG1vZGVsIHZhbHVlcyBhcmUgbW9kaWZpZWQgZnJvbSBvdXRzaWRlIHRoZSBzbGlkZXIsIGFuZCB0aGV5IGFyZSBvdXRzaWRlIGFsbG93ZWQgcmFuZ2UsXG4gICAgdGhlIHNsaWRlciBtYXkgYmUgcmVuZGVyZWQgaW5jb3JyZWN0bHkuIEhvd2V2ZXIsIHNldHRpbmcgdGhpcyB0byBmYWxzZSBtYXkgYmUgdXNlZnVsIGlmIHlvdSB3YW50IHRvIHBlcmZvcm0gY3VzdG9tIG5vcm1hbGlzYXRpb24uICovXG4gIGVuZm9yY2VTdGVwc0FycmF5PzogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIHByZXZlbnQgdG8gdXNlciBmcm9tIHN3aXRjaGluZyB0aGUgbWluIGFuZCBtYXggaGFuZGxlcy4gQXBwbGllcyB0byByYW5nZSBzbGlkZXIgb25seS4gKi9cbiAgbm9Td2l0Y2hpbmc/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIG9ubHkgYmluZCBldmVudHMgb24gc2xpZGVyIGhhbmRsZXMuICovXG4gIG9ubHlCaW5kSGFuZGxlcz86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gc2hvdyBncmFwaHMgcmlnaHQgdG8gbGVmdC5cbiAgICBJZiB2ZXJ0aWNhbCBpcyB0cnVlIGl0IHdpbGwgYmUgZnJvbSB0b3AgdG8gYm90dG9tIGFuZCBsZWZ0IC8gcmlnaHQgYXJyb3cgZnVuY3Rpb25zIHJldmVyc2VkLiAqL1xuICByaWdodFRvTGVmdD86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gcmV2ZXJzZSBrZXlib2FyZCBuYXZpZ2F0aW9uOlxuICAgIFJpZ2h0L3RvcCBhcnJvd3M6IC0xXG4gICAgTGVmdC9ib3R0b20gYXJyb3dzOiArMVxuICAgIFBhZ2UtdXA6IC0xMCVcbiAgICBQYWdlLWRvd246ICsxMCVcbiAgICBFbmQ6IG1pbmltdW0gdmFsdWVcbiAgICBIb21lOiBtYXhpbXVtIHZhbHVlXG4gICAqL1xuICByZXZlcnNlZENvbnRyb2xzPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBrZWVwIHRoZSBzbGlkZXIgbGFiZWxzIGluc2lkZSB0aGUgc2xpZGVyIGJvdW5kcy4gKi9cbiAgYm91bmRQb2ludGVyTGFiZWxzPzogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIHVzZSBhIGxvZ2FyaXRobWljIHNjYWxlIHRvIGRpc3BsYXkgdGhlIHNsaWRlci4gICovXG4gIGxvZ1NjYWxlPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHBvc2l0aW9uIG9uIHRoZSBzbGlkZXIgZm9yIGEgZ2l2ZW4gdmFsdWUuXG4gICAgVGhlIHBvc2l0aW9uIG11c3QgYmUgYSBwZXJjZW50YWdlIGJldHdlZW4gMCBhbmQgMS5cbiAgICBUaGUgZnVuY3Rpb24gc2hvdWxkIGJlIG1vbm90b25pY2FsbHkgaW5jcmVhc2luZyBvciBkZWNyZWFzaW5nOyBvdGhlcndpc2UgdGhlIHNsaWRlciBtYXkgYmVoYXZlIGluY29ycmVjdGx5LiAqL1xuICBjdXN0b21WYWx1ZVRvUG9zaXRpb24/OiBWYWx1ZVRvUG9zaXRpb25GdW5jdGlvbiA9IG51bGw7XG5cbiAgLyoqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgZm9yIGEgZ2l2ZW4gcG9zaXRpb24gb24gdGhlIHNsaWRlci5cbiAgICBUaGUgcG9zaXRpb24gaXMgYSBwZXJjZW50YWdlIGJldHdlZW4gMCBhbmQgMS5cbiAgICBUaGUgZnVuY3Rpb24gc2hvdWxkIGJlIG1vbm90b25pY2FsbHkgaW5jcmVhc2luZyBvciBkZWNyZWFzaW5nOyBvdGhlcndpc2UgdGhlIHNsaWRlciBtYXkgYmVoYXZlIGluY29ycmVjdGx5LiAqL1xuICBjdXN0b21Qb3NpdGlvblRvVmFsdWU/OiBQb3NpdGlvblRvVmFsdWVGdW5jdGlvbiA9IG51bGw7XG5cbiAgLyoqIFByZWNpc2lvbiBsaW1pdCBmb3IgY2FsY3VsYXRlZCB2YWx1ZXMuXG4gICAgVmFsdWVzIHVzZWQgaW4gY2FsY3VsYXRpb25zIHdpbGwgYmUgcm91bmRlZCB0byB0aGlzIG51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHNcbiAgICB0byBwcmV2ZW50IGFjY3VtdWxhdGluZyBzbWFsbCBmbG9hdGluZy1wb2ludCBlcnJvcnMuICovXG4gIHByZWNpc2lvbkxpbWl0PzogbnVtYmVyID0gMTI7XG5cbiAgLyoqIFVzZSB0byBkaXNwbGF5IHRoZSBzZWxlY3Rpb24gYmFyIGFzIGEgZ3JhZGllbnQuXG4gICAgVGhlIGdpdmVuIG9iamVjdCBtdXN0IGNvbnRhaW4gZnJvbSBhbmQgdG8gcHJvcGVydGllcyB3aGljaCBhcmUgY29sb3JzLiAqL1xuICBzZWxlY3Rpb25CYXJHcmFkaWVudD86IHtmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmd9ID0gbnVsbDtcblxuICAvKiogVXNlIHRvIGFkZCBhIGxhYmVsIGRpcmVjdGx5IHRvIHRoZSBzbGlkZXIgZm9yIGFjY2Vzc2liaWxpdHkuIEFkZHMgdGhlIGFyaWEtbGFiZWwgYXR0cmlidXRlLiAqL1xuICBhcmlhTGFiZWw/OiBzdHJpbmcgPSBudWxsO1xuXG4gIC8qKiBVc2UgaW5zdGVhZCBvZiBhcmlhTGFiZWwgdG8gcmVmZXJlbmNlIHRoZSBpZCBvZiBhbiBlbGVtZW50IHdoaWNoIHdpbGwgYmUgdXNlZCB0byBsYWJlbCB0aGUgc2xpZGVyLlxuICAgIEFkZHMgdGhlIGFyaWEtbGFiZWxsZWRieSBhdHRyaWJ1dGUuICovXG4gIGFyaWFMYWJlbGxlZEJ5Pzogc3RyaW5nID0gbnVsbDtcblxuICAvKiogVXNlIHRvIGFkZCBhIGxhYmVsIGRpcmVjdGx5IHRvIHRoZSBzbGlkZXIgcmFuZ2UgZm9yIGFjY2Vzc2liaWxpdHkuIEFkZHMgdGhlIGFyaWEtbGFiZWwgYXR0cmlidXRlLiAqL1xuICBhcmlhTGFiZWxIaWdoPzogc3RyaW5nID0gbnVsbDtcblxuICAvKiogVXNlIGluc3RlYWQgb2YgYXJpYUxhYmVsSGlnaCB0byByZWZlcmVuY2UgdGhlIGlkIG9mIGFuIGVsZW1lbnQgd2hpY2ggd2lsbCBiZSB1c2VkIHRvIGxhYmVsIHRoZSBzbGlkZXIgcmFuZ2UuXG4gICAgQWRkcyB0aGUgYXJpYS1sYWJlbGxlZGJ5IGF0dHJpYnV0ZS4gKi9cbiAgYXJpYUxhYmVsbGVkQnlIaWdoPzogc3RyaW5nID0gbnVsbDtcblxuICAvKiogVXNlIHRvIGluY3JlYXNlIHJlbmRlcmluZyBwZXJmb3JtYW5jZS4gSWYgdGhlIHZhbHVlIGlzIG5vdCBwcm92aWRlZCwgdGhlIHNsaWRlciBjYWxjdWxhdGVzIHRoZSB3aXRoL2hlaWdodCBvZiB0aGUgaGFuZGxlICovXG4gIGhhbmRsZURpbWVuc2lvbj86IG51bWJlciA9IG51bGw7XG5cbiAgLyoqIFVzZSB0byBpbmNyZWFzZSByZW5kZXJpbmcgcGVyZm9ybWFuY2UuIElmIHRoZSB2YWx1ZSBpcyBub3QgcHJvdmlkZWQsIHRoZSBzbGlkZXIgY2FsY3VsYXRlcyB0aGUgd2l0aC9oZWlnaHQgb2YgdGhlIGJhciAqL1xuICBiYXJEaW1lbnNpb24/OiBudW1iZXIgPSBudWxsO1xuXG4gIC8qKiBFbmFibGUvZGlzYWJsZSBDU1MgYW5pbWF0aW9ucyAqL1xuICBhbmltYXRlPzogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqIEVuYWJsZS9kaXNhYmxlIENTUyBhbmltYXRpb25zIHdoaWxlIG1vdmluZyB0aGUgc2xpZGVyICovXG4gIGFuaW1hdGVPbk1vdmU/OiBib29sZWFuID0gZmFsc2U7XG59XG4iXX0=