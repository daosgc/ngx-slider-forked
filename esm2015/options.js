/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
const LabelType = {
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
export class Options {
    constructor() {
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
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXNsaWRlci9uZ3gtc2xpZGVyLyIsInNvdXJjZXMiOlsib3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0lBS0UsTUFBRzs7SUFFSCxPQUFJOztJQUVKLFFBQUs7O0lBRUwsT0FBSTs7SUFFSixZQUFTOzs7b0JBUlQsR0FBRztvQkFFSCxJQUFJO29CQUVKLEtBQUs7b0JBRUwsSUFBSTtvQkFFSixTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4QlgsTUFBTTs7Ozs7O3FCQUdhLENBQUM7Ozs7O29CQUlGLElBQUk7Ozs7O29CQUlKLENBQUM7Ozs7Ozt3QkFLRyxJQUFJOzs7Ozs7d0JBS0osSUFBSTs7Ozs7Ozt5QkFNRixLQUFLOzs7Ozt3QkFJUCxJQUFJOzs7Ozt3QkFJSixJQUFJOzs7Ozt5QkFJUSxJQUFJOzs7Ozs7Ozs2QkFPSSxJQUFJOzs7Ozs7Ozs7eUJBUVosSUFBSTs7Ozs7NkJBSUksSUFBSTs7Ozs7Ozs7OzswQkFTTixJQUFJOzs7O3NDQUdQLEtBQUs7Ozs7OzhCQUliLEtBQUs7Ozs7O2tDQUlELEtBQUs7Ozs7Z0NBR1AsS0FBSzs7OzttQ0FHRixLQUFLOzs7Ozt5Q0FJQSxJQUFJOzs7OztzQ0FJTixLQUFLOzs7O2lDQUdWLEtBQUs7Ozs7K0JBR1AsS0FBSzs7OzttQ0FHRCxJQUFJOzs7O3dCQUdmLEtBQUs7Ozs7d0JBR0wsS0FBSzs7Ozs7bUNBSUssRUFBRTs7Ozs7bUNBSUYsRUFBRTs7Ozs7bUNBSUYsR0FBRzs7Ozs7b0NBSUYsR0FBRzs7Ozt5QkFHYixLQUFLOzs7OytCQUdDLEtBQUs7Ozt3QkFJYixJQUFJOzs7NkJBSUMsSUFBSTs7Ozs7OzBCQUtMLElBQUk7Ozs7OzRCQUllLElBQUk7Ozs7a0NBR0UsSUFBSTs7Ozs7O3dCQUtoQyxLQUFLOzs7Ozs7Ozs7b0NBUStDLElBQUk7Ozs7NEJBR2xDLElBQUk7Ozs7Ozs7Ozs7K0JBU3lCLElBQUk7Ozs7Ozs7Ozs7K0JBVWhELElBQUk7Ozs7O3FCQUlmLENBQUM7Ozs7OzsyQkFLTSxJQUFJOzs7Ozs7NEJBS0gsSUFBSTs7Ozs7O2lDQUtDLElBQUk7Ozs7MkJBR1YsS0FBSzs7OzsrQkFHRCxLQUFLOzs7OzsyQkFJVCxLQUFLOzs7Ozs7Ozs7O2dDQVVBLEtBQUs7Ozs7a0NBR0gsSUFBSTs7Ozt3QkFHZCxLQUFLOzs7Ozs7cUNBS3dCLElBQUk7Ozs7OztxQ0FLSixJQUFJOzs7Ozs7OEJBSzVCLEVBQUU7Ozs7O29DQUl3QixJQUFJOzs7O3lCQUduQyxJQUFJOzs7Ozs4QkFJQyxJQUFJOzs7OzZCQUdMLElBQUk7Ozs7O2tDQUlDLElBQUk7Ozs7K0JBR1AsSUFBSTs7Ozs0QkFHUCxJQUFJOzs7O3VCQUdSLElBQUk7Ozs7NkJBR0UsS0FBSzs7Q0FDaEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQb2ludGVyVHlwZSB9IGZyb20gJy4vcG9pbnRlci10eXBlJztcblxuLyoqIExhYmVsIHR5cGUgKi9cbmV4cG9ydCBlbnVtIExhYmVsVHlwZSB7XG4gIC8qKiBMYWJlbCBhYm92ZSBsb3cgcG9pbnRlciAqL1xuICBMb3csXG4gIC8qKiBMYWJlbCBhYm92ZSBoaWdoIHBvaW50ZXIgKi9cbiAgSGlnaCxcbiAgLyoqIExhYmVsIGZvciBtaW5pbXVtIHNsaWRlciB2YWx1ZSAqL1xuICBGbG9vcixcbiAgLyoqIExhYmVsIGZvciBtYXhpbXVtIHNsaWRlciB2YWx1ZSAqL1xuICBDZWlsLFxuICAvKiogTGFiZWwgYmVsb3cgbGVnZW5kIHRpY2sgKi9cbiAgVGlja1ZhbHVlXG59XG5cbi8qKiBGdW5jdGlvbiB0byB0cmFuc2xhdGUgbGFiZWwgdmFsdWUgaW50byB0ZXh0ICovXG5leHBvcnQgdHlwZSBUcmFuc2xhdGVGdW5jdGlvbiA9ICh2YWx1ZTogbnVtYmVyLCBsYWJlbDogTGFiZWxUeXBlKSA9PiBzdHJpbmc7XG4vKiogRnVuY3Rpb24gdG8gY29tYmluZCAqL1xuZXhwb3J0IHR5cGUgQ29tYmluZUxhYmVsc0Z1bmN0aW9uID0gKG1pbkxhYmVsOiBzdHJpbmcsIG1heExhYmVsOiBzdHJpbmcpID0+IHN0cmluZztcbi8qKiBGdW5jdGlvbiB0byBwcm92aWRlIGxlZ2VuZCAgKi9cbmV4cG9ydCB0eXBlIEdldExlZ2VuZEZ1bmN0aW9uID0gKHZhbHVlOiBudW1iZXIpID0+IHN0cmluZztcbmV4cG9ydCB0eXBlIEdldFN0ZXBMZWdlbmRGdW5jdGlvbiA9IChzdGVwOiBDdXN0b21TdGVwRGVmaW5pdGlvbikgPT4gc3RyaW5nO1xuXG4vKiogRnVuY3Rpb24gY29udmVydGluZyBzbGlkZXIgdmFsdWUgdG8gc2xpZGVyIHBvc2l0aW9uICovXG5leHBvcnQgdHlwZSBWYWx1ZVRvUG9zaXRpb25GdW5jdGlvbiA9ICh2YWw6IG51bWJlciwgbWluVmFsOiBudW1iZXIsIG1heFZhbDogbnVtYmVyKSA9PiBudW1iZXI7XG5cbi8qKiBGdW5jdGlvbiBjb252ZXJ0aW5nIHNsaWRlciBwb3NpdGlvbiB0byBzbGlkZXIgdmFsdWUgKi9cbmV4cG9ydCB0eXBlIFBvc2l0aW9uVG9WYWx1ZUZ1bmN0aW9uID0gKHBlcmNlbnQ6IG51bWJlciwgbWluVmFsOiBudW1iZXIsIG1heFZhbDogbnVtYmVyKSA9PiBudW1iZXI7XG5cbi8qKlxuICogQ3VzdG9tIHN0ZXAgZGVmaW5pdGlvblxuICpcbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gc3BlY2lmeSBjdXN0b20gdmFsdWVzIGFuZCBsZWdlbmQgdmFsdWVzIGZvciBzbGlkZXIgdGlja3NcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDdXN0b21TdGVwRGVmaW5pdGlvbiB7XG4gIC8qKiBWYWx1ZSAqL1xuICB2YWx1ZTogbnVtYmVyO1xuICAvKiogTGVnZW5kIChsYWJlbCBmb3IgdGhlIHZhbHVlKSAqL1xuICBsZWdlbmQ/OiBzdHJpbmc7XG59XG5cbi8qKiBTbGlkZXIgb3B0aW9ucyAqL1xuZXhwb3J0IGNsYXNzIE9wdGlvbnMge1xuICAvKiogTWluaW11bSB2YWx1ZSBmb3IgYSBzbGlkZXIuXG4gICAgTm90IGFwcGxpY2FibGUgd2hlbiB1c2luZyBzdGVwc0FycmF5LiAqL1xuICBmbG9vcj86IG51bWJlciA9IDA7XG5cbiAgLyoqIE1heGltdW0gdmFsdWUgZm9yIGEgc2xpZGVyLlxuICAgIE5vdCBhcHBsaWNhYmxlIHdoZW4gdXNpbmcgc3RlcHNBcnJheS4gKi9cbiAgY2VpbD86IG51bWJlciA9IG51bGw7XG5cbiAgLyoqIFN0ZXAgYmV0d2VlbiBlYWNoIHZhbHVlLlxuICAgIE5vdCBhcHBsaWNhYmxlIHdoZW4gdXNpbmcgc3RlcHNBcnJheS4gKi9cbiAgc3RlcD86IG51bWJlciA9IDE7XG5cbiAgLyoqIFRoZSBtaW5pbXVtIHJhbmdlIGF1dGhvcml6ZWQgb24gdGhlIHNsaWRlci5cbiAgICBBcHBsaWVzIHRvIHJhbmdlIHNsaWRlciBvbmx5LlxuICAgIFdoZW4gdXNpbmcgc3RlcHNBcnJheSwgZXhwcmVzc2VkIGFzIGluZGV4IGludG8gc3RlcHNBcnJheS4gKi9cbiAgbWluUmFuZ2U/OiBudW1iZXIgPSBudWxsO1xuXG4gIC8qKiBUaGUgbWF4aW11bSByYW5nZSBhdXRob3JpemVkIG9uIHRoZSBzbGlkZXIuXG4gICAgQXBwbGllcyB0byByYW5nZSBzbGlkZXIgb25seS5cbiAgICBXaGVuIHVzaW5nIHN0ZXBzQXJyYXksIGV4cHJlc3NlZCBhcyBpbmRleCBpbnRvIHN0ZXBzQXJyYXkuICovXG4gIG1heFJhbmdlPzogbnVtYmVyID0gbnVsbDtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gaGF2ZSBhIHB1c2ggYmVoYXZpb3IuIFdoZW4gdGhlIG1pbiBoYW5kbGUgZ29lcyBhYm92ZSB0aGUgbWF4LFxuICAgIHRoZSBtYXggaXMgbW92ZWQgYXMgd2VsbCAoYW5kIHZpY2UtdmVyc2EpLiBUaGUgcmFuZ2UgYmV0d2VlbiBtaW4gYW5kIG1heCBpc1xuICAgIGRlZmluZWQgYnkgdGhlIHN0ZXAgb3B0aW9uIChkZWZhdWx0cyB0byAxKSBhbmQgY2FuIGFsc28gYmUgb3ZlcnJpZGVuIGJ5XG4gICAgdGhlIG1pblJhbmdlIG9wdGlvbi4gQXBwbGllcyB0byByYW5nZSBzbGlkZXIgb25seS4gKi9cbiAgcHVzaFJhbmdlPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgbWluaW11bSB2YWx1ZSBhdXRob3JpemVkIG9uIHRoZSBzbGlkZXIuXG4gICAgV2hlbiB1c2luZyBzdGVwc0FycmF5LCBleHByZXNzZWQgYXMgaW5kZXggaW50byBzdGVwc0FycmF5LiAqL1xuICBtaW5MaW1pdD86IG51bWJlciA9IG51bGw7XG5cbiAgLyoqIFRoZSBtYXhpbXVtIHZhbHVlIGF1dGhvcml6ZWQgb24gdGhlIHNsaWRlci5cbiAgICBXaGVuIHVzaW5nIHN0ZXBzQXJyYXksIGV4cHJlc3NlZCBhcyBpbmRleCBpbnRvIHN0ZXBzQXJyYXkuICovXG4gIG1heExpbWl0PzogbnVtYmVyID0gbnVsbDtcblxuICAvKiogQ3VzdG9tIHRyYW5zbGF0ZSBmdW5jdGlvbi4gVXNlIHRoaXMgaWYgeW91IHdhbnQgdG8gdHJhbnNsYXRlIHZhbHVlcyBkaXNwbGF5ZWRcbiAgICAgIG9uIHRoZSBzbGlkZXIuICovXG4gIHRyYW5zbGF0ZT86IFRyYW5zbGF0ZUZ1bmN0aW9uID0gbnVsbDtcblxuICAvKiogQ3VzdG9tIGZ1bmN0aW9uIGZvciBjb21iaW5pbmcgb3ZlcmxhcHBpbmcgbGFiZWxzIGluIHJhbmdlIHNsaWRlci5cbiAgICAgIEl0IHRha2VzIHRoZSBtaW4gYW5kIG1heCB2YWx1ZXMgKGFscmVhZHkgdHJhbnNsYXRlZCB3aXRoIHRyYW5zbGF0ZSBmdWN0aW9uKVxuICAgICAgYW5kIHNob3VsZCByZXR1cm4gaG93IHRoZXNlIHR3byB2YWx1ZXMgc2hvdWxkIGJlIGNvbWJpbmVkLlxuICAgICAgSWYgbm90IHByb3ZpZGVkLCB0aGUgZGVmYXVsdCBmdW5jdGlvbiB3aWxsIGpvaW4gdGhlIHR3byB2YWx1ZXMgd2l0aFxuICAgICAgJyAtICcgYXMgc2VwYXJhdG9yLiAqL1xuICBjb21iaW5lTGFiZWxzPzogQ29tYmluZUxhYmVsc0Z1bmN0aW9uID0gbnVsbDtcblxuICAvKiogVXNlIHRvIGRpc3BsYXkgbGVnZW5kIHVuZGVyIHRpY2tzICh0aHVzLCBpdCBuZWVkcyB0byBiZSB1c2VkIGFsb25nIHdpdGhcbiAgICAgc2hvd1RpY2tzIG9yIHNob3dUaWNrc1ZhbHVlcykuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aXRoIGVhY2ggdGlja1xuICAgICB2YWx1ZSBhbmQgcmV0dXJuZWQgY29udGVudCB3aWxsIGJlIGRpc3BsYXllZCB1bmRlciB0aGUgdGljayBhcyBhIGxlZ2VuZC5cbiAgICAgSWYgdGhlIHJldHVybmVkIHZhbHVlIGlzIG51bGwsIHRoZW4gbm8gbGVnZW5kIGlzIGRpc3BsYXllZCB1bmRlclxuICAgICB0aGUgY29ycmVzcG9uZGluZyB0aWNrLllvdSBjYW4gYWxzbyBkaXJlY3RseSBwcm92aWRlIHRoZSBsZWdlbmQgdmFsdWVzXG4gICAgIGluIHRoZSBzdGVwc0FycmF5IG9wdGlvbi4gKi9cbiAgZ2V0TGVnZW5kPzogR2V0TGVnZW5kRnVuY3Rpb24gPSBudWxsO1xuXG4gICAvKiogVXNlIHRvIGRpc3BsYXkgYSBjdXN0b20gbGVnZW5kIG9mIGEgc3RlcEl0ZW0gZnJvbSBzdGVwc0FycmF5LlxuICAgIEl0IHdpbGwgYmUgdGhlIHNhbWUgYXMgZ2V0TGVnZW4gYnV0IGZvciBzdGVwc0FycmF5LiAqL1xuICBnZXRTdGVwTGVnZW5kPzogR2V0U3RlcExlZ2VuZEZ1bmN0aW9uID0gbnVsbDtcblxuICAvKiogSWYgeW91IHdhbnQgdG8gZGlzcGxheSBhIHNsaWRlciB3aXRoIG5vbiBsaW5lYXIvbnVtYmVyIHN0ZXBzLlxuICAgICBKdXN0IHBhc3MgYW4gYXJyYXkgd2l0aCBlYWNoIHNsaWRlciB2YWx1ZSBhbmQgdGhhdCdzIGl0OyB0aGUgZmxvb3IsIGNlaWwgYW5kIHN0ZXAgc2V0dGluZ3NcbiAgICAgb2YgdGhlIHNsaWRlciB3aWxsIGJlIGNvbXB1dGVkIGF1dG9tYXRpY2FsbHkuXG4gICAgIEJ5IGRlZmF1bHQsIHRoZSB2YWx1ZSBtb2RlbCBhbmQgdmFsdWVIaWdoIG1vZGVsIHZhbHVlcyB3aWxsIGJlIHRoZSB2YWx1ZSBvZiB0aGUgc2VsZWN0ZWQgaXRlbVxuICAgICBpbiB0aGUgc3RlcHNBcnJheS5cbiAgICAgVGhleSBjYW4gYWxzbyBiZSBib3VuZCB0byB0aGUgaW5kZXggb2YgdGhlIHNlbGVjdGVkIGl0ZW0gYnkgc2V0dGluZyB0aGUgYmluZEluZGV4Rm9yU3RlcHNBcnJheVxuICAgICBvcHRpb24gdG8gdHJ1ZS4gKi9cbiAgc3RlcHNBcnJheT86IEN1c3RvbVN0ZXBEZWZpbml0aW9uW10gPSBudWxsO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBiaW5kIHRoZSBpbmRleCBvZiB0aGUgc2VsZWN0ZWQgaXRlbSB0byB2YWx1ZSBtb2RlbCBhbmQgdmFsdWVIaWdoIG1vZGVsLiAqL1xuICBiaW5kSW5kZXhGb3JTdGVwc0FycmF5PzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGVuIHNldCB0byB0cnVlIGFuZCB1c2luZyBhIHJhbmdlIHNsaWRlciwgdGhlIHJhbmdlIGNhbiBiZSBkcmFnZ2VkIGJ5IHRoZSBzZWxlY3Rpb24gYmFyLlxuICAgIEFwcGxpZXMgdG8gcmFuZ2Ugc2xpZGVyIG9ubHkuICovXG4gIGRyYWdnYWJsZVJhbmdlPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBTYW1lIGFzIGRyYWdnYWJsZVJhbmdlIGJ1dCB0aGUgc2xpZGVyIHJhbmdlIGNhbid0IGJlIGNoYW5nZWQuXG4gICAgQXBwbGllcyB0byByYW5nZSBzbGlkZXIgb25seS4gKi9cbiAgZHJhZ2dhYmxlUmFuZ2VPbmx5PzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBhbHdheXMgc2hvdyB0aGUgc2VsZWN0aW9uIGJhciBiZWZvcmUgdGhlIHNsaWRlciBoYW5kbGUuICovXG4gIHNob3dTZWxlY3Rpb25CYXI/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIGFsd2F5cyBzaG93IHRoZSBzZWxlY3Rpb24gYmFyIGFmdGVyIHRoZSBzbGlkZXIgaGFuZGxlLiAqL1xuICBzaG93U2VsZWN0aW9uQmFyRW5kPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiAgU2V0IGEgbnVtYmVyIHRvIGRyYXcgdGhlIHNlbGVjdGlvbiBiYXIgYmV0d2VlbiB0aGlzIHZhbHVlIGFuZCB0aGUgc2xpZGVyIGhhbmRsZS5cbiAgICBXaGVuIHVzaW5nIHN0ZXBzQXJyYXksIGV4cHJlc3NlZCBhcyBpbmRleCBpbnRvIHN0ZXBzQXJyYXkuICovXG4gIHNob3dTZWxlY3Rpb25CYXJGcm9tVmFsdWU/OiBudW1iZXIgPSBudWxsO1xuXG4gIC8qKiAgT25seSBmb3IgcmFuZ2Ugc2xpZGVyLiBTZXQgdG8gdHJ1ZSB0byB2aXN1YWxpemUgaW4gZGlmZmVyZW50IGNvbG91ciB0aGUgYXJlYXNcbiAgICBvbiB0aGUgbGVmdC9yaWdodCAodG9wL2JvdHRvbSBmb3IgdmVydGljYWwgcmFuZ2Ugc2xpZGVyKSBvZiBzZWxlY3Rpb24gYmFyIGJldHdlZW4gdGhlIGhhbmRsZXMuICovXG4gIHNob3dPdXRlclNlbGVjdGlvbkJhcnM/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIGhpZGUgcG9pbnRlciBsYWJlbHMgKi9cbiAgaGlkZVBvaW50ZXJMYWJlbHM/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIGhpZGUgbWluIC8gbWF4IGxhYmVscyAgKi9cbiAgaGlkZUxpbWl0TGFiZWxzPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSB0aGUgYXV0by1oaWRpbmcgYmVoYXZpb3Igb2YgdGhlIGxpbWl0IGxhYmVscy4gKi9cbiAgYXV0b0hpZGVMaW1pdExhYmVscz86IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBtYWtlIHRoZSBzbGlkZXIgcmVhZC1vbmx5LiAqL1xuICByZWFkT25seT86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gZGlzYWJsZSB0aGUgc2xpZGVyLiAqL1xuICBkaXNhYmxlZD86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogVGhyb3R0bGUgaW50ZXJ2YWwgZm9yIG1vdXNlIGV2ZW50cyBpbiBtaWxsaXNlY29uZHMuXG4gICAqIFRoaXMgaXMgcHJvdmlkZWQgdG8gYXZvaWQgYSBmbG9vZCBvZiBldmVudHMgd2hlbiBtb3ZpbmcgdGhlIHNsaWRlciB3aXRoIG1vdXNlLiAqL1xuICBtb3VzZUV2ZW50c0ludGVydmFsPzogbnVtYmVyID0gNTA7XG5cbiAgLyoqIFRocm90dGxlIGludGVydmFsIGZvciB0b3VjaCBldmVudHMgaW4gbWlsbGlzZWNvbmRzLlxuICAgKiBUaGlzIGlzIHByb3ZpZGVkIHRvIGF2b2lkIGEgZmxvb2Qgb2YgZXZlbnRzIHdoZW4gbW92aW5nIHRoZSBzbGlkZXIgd2l0aCB0b3VjaCBnZXN0dXJlLiAqL1xuICB0b3VjaEV2ZW50c0ludGVydmFsPzogbnVtYmVyID0gNTA7XG5cbiAgLyoqIFRocm90dGxlIGludGVydmFsIGZvciBpbnB1dCBjaGFuZ2VzIChjaGFuZ2VzIHRvIGJpbmRpbmdzIG9yIHJlYWN0aXZlIGZvcm0gaW5wdXRzKVxuICAgKiBUaGlzIGlzIHByb3ZpZGVkIHRvIGF2b2lkIGEgZmxvb2Qgb2YgZXZlbnRzIG9uIGZyZXF1ZW50IGlucHV0IGJpbmRpbmcgY2hhbmdlcyBhZmZlY3RpbmcgcGVyZm9ybWFuY2UuICovXG4gIGlucHV0RXZlbnRzSW50ZXJ2YWw/OiBudW1iZXIgPSAxMDA7XG5cbiAgLyoqIFRocm90dGxlIGludGVydmFsIGZvciBvdXRwdXQgY2hhbmdlcyAoc2lnbmFsbGluZyBjaGFuZ2VzIHRvIG91dHB1dCBiaW5kaW5ncyBhbmQgdXNlciBjYWxsYmFja3MpXG4gICAqIFRoaXMgaXMgcHJvdmlkZWQgdG8gYXZvaWQgYSBmbG9vZCBvZiBvdXRnb2luZyBldmVudHMgYWZmZWN0aW5nIEFuZ3VsYXIgYXBwIHBlcmZvcm1hbmNlLiAqL1xuICBvdXRwdXRFdmVudHNJbnRlcnZhbD86IG51bWJlciA9IDEwMDtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gZGlzcGxheSBhIHRpY2sgZm9yIGVhY2ggc3RlcCBvZiB0aGUgc2xpZGVyLiAqL1xuICBzaG93VGlja3M/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIGRpc3BsYXkgYSB0aWNrIGFuZCB0aGUgc3RlcCB2YWx1ZSBmb3IgZWFjaCBzdGVwIG9mIHRoZSBzbGlkZXIuLiAqL1xuICBzaG93VGlja3NWYWx1ZXM/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyogVGhlIHN0ZXAgYmV0d2VlbiBlYWNoIHRpY2sgdG8gZGlzcGxheS4gSWYgbm90IHNldCwgdGhlIHN0ZXAgdmFsdWUgaXMgdXNlZC5cbiAgICBOb3QgdXNlZCB3aGVuIHRpY2tzQXJyYXkgaXMgc3BlY2lmaWVkLiAqL1xuICB0aWNrU3RlcD86IG51bWJlciA9IG51bGw7XG5cbiAgLyogVGhlIHN0ZXAgYmV0d2VlbiBkaXNwbGF5aW5nIGVhY2ggdGljayBzdGVwIHZhbHVlLlxuICAgIElmIG5vdCBzZXQsIHRoZW4gdGlja1N0ZXAgb3Igc3RlcCBpcyB1c2VkLCBkZXBlbmRpbmcgb24gd2hpY2ggb25lIGlzIHNldC4gKi9cbiAgdGlja1ZhbHVlU3RlcD86IG51bWJlciA9IG51bGw7XG5cbiAgLyoqIFVzZSB0byBkaXNwbGF5IHRpY2tzIGF0IHNwZWNpZmljIHBvc2l0aW9ucy5cbiAgICBUaGUgYXJyYXkgY29udGFpbnMgdGhlIGluZGV4IG9mIHRoZSB0aWNrcyB0aGF0IHNob3VsZCBiZSBkaXNwbGF5ZWQuXG4gICAgRm9yIGV4YW1wbGUsIFswLCAxLCA1XSB3aWxsIGRpc3BsYXkgYSB0aWNrIGZvciB0aGUgZmlyc3QsIHNlY29uZCBhbmQgc2l4dGggdmFsdWVzLiAqL1xuICB0aWNrc0FycmF5PzogbnVtYmVyW10gPSBudWxsO1xuXG4gIC8qKiBVc2VkIHRvIGRpc3BsYXkgYSB0b29sdGlwIHdoZW4gYSB0aWNrIGlzIGhvdmVyZWQuXG4gICAgU2V0IHRvIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB0b29sdGlwIGNvbnRlbnQgZm9yIGEgZ2l2ZW4gdmFsdWUuICovXG4gIHRpY2tzVG9vbHRpcD86ICh2YWx1ZTogbnVtYmVyKSA9PiBzdHJpbmcgPSBudWxsO1xuXG4gIC8qKiBTYW1lIGFzIHRpY2tzVG9vbHRpcCBidXQgZm9yIHRpY2tzIHZhbHVlcy4gKi9cbiAgdGlja3NWYWx1ZXNUb29sdGlwPzogKHZhbHVlOiBudW1iZXIpID0+IHN0cmluZyA9IG51bGw7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIGRpc3BsYXkgdGhlIHNsaWRlciB2ZXJ0aWNhbGx5LlxuICAgIFRoZSBzbGlkZXIgd2lsbCB0YWtlIHRoZSBmdWxsIGhlaWdodCBvZiBpdHMgcGFyZW50LlxuICAgIENoYW5naW5nIHRoaXMgdmFsdWUgYXQgcnVudGltZSBpcyBub3QgY3VycmVudGx5IHN1cHBvcnRlZC4gKi9cbiAgdmVydGljYWw/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgY3VycmVudCBjb2xvciBvZiB0aGUgc2VsZWN0aW9uIGJhci5cbiAgICBJZiB5b3VyIGNvbG9yIHdvbid0IGNoYW5nZSwgZG9uJ3QgdXNlIHRoaXMgb3B0aW9uIGJ1dCBzZXQgaXQgdGhyb3VnaCBDU1MuXG4gICAgSWYgdGhlIHJldHVybmVkIGNvbG9yIGRlcGVuZHMgb24gYSBtb2RlbCB2YWx1ZSAoZWl0aGVyIHZhbHVlIG9yIHZhbHVlSGlnaCksXG4gICAgeW91IHNob3VsZCB1c2UgdGhlIGFyZ3VtZW50IHBhc3NlZCB0byB0aGUgZnVuY3Rpb24uXG4gICAgSW5kZWVkLCB3aGVuIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQsIHRoZXJlIGlzIG5vIGNlcnRhaW50eSB0aGF0IHRoZSBtb2RlbFxuICAgIGhhcyBhbHJlYWR5IGJlZW4gdXBkYXRlZC4qL1xuICBnZXRTZWxlY3Rpb25CYXJDb2xvcj86IChtaW5WYWx1ZTogbnVtYmVyLCBtYXhWYWx1ZT86IG51bWJlcikgPT4gc3RyaW5nID0gbnVsbDtcblxuICAvKiogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBjb2xvciBvZiBhIHRpY2suIHNob3dUaWNrcyBtdXN0IGJlIGVuYWJsZWQuICovXG4gIGdldFRpY2tDb2xvcj86ICh2YWx1ZTogbnVtYmVyKSA9PiBzdHJpbmcgPSBudWxsO1xuXG4gIC8qKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGN1cnJlbnQgY29sb3Igb2YgYSBwb2ludGVyLlxuICAgIElmIHlvdXIgY29sb3Igd29uJ3QgY2hhbmdlLCBkb24ndCB1c2UgdGhpcyBvcHRpb24gYnV0IHNldCBpdCB0aHJvdWdoIENTUy5cbiAgICBJZiB0aGUgcmV0dXJuZWQgY29sb3IgZGVwZW5kcyBvbiBhIG1vZGVsIHZhbHVlIChlaXRoZXIgdmFsdWUgb3IgdmFsdWVIaWdoKSxcbiAgICB5b3Ugc2hvdWxkIHVzZSB0aGUgYXJndW1lbnQgcGFzc2VkIHRvIHRoZSBmdW5jdGlvbi5cbiAgICBJbmRlZWQsIHdoZW4gdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlcmUgaXMgbm8gY2VydGFpbnR5IHRoYXQgdGhlIG1vZGVsIGhhcyBhbHJlYWR5IGJlZW4gdXBkYXRlZC5cbiAgICBUbyBoYW5kbGUgcmFuZ2Ugc2xpZGVyIHBvaW50ZXJzIGluZGVwZW5kZW50bHksIHlvdSBzaG91bGQgZXZhbHVhdGUgcG9pbnRlclR5cGUgd2l0aGluIHRoZSBnaXZlblxuICAgIGZ1bmN0aW9uIHdoZXJlIFwibWluXCIgc3RhbmRzIGZvciB2YWx1ZSBtb2RlbCBhbmQgXCJtYXhcIiBmb3IgdmFsdWVIaWdoIG1vZGVsIHZhbHVlcy4gKi9cbiAgZ2V0UG9pbnRlckNvbG9yPzogKHZhbHVlOiBudW1iZXIsIHBvaW50ZXJUeXBlOiBQb2ludGVyVHlwZSkgPT4gc3RyaW5nID0gbnVsbDtcblxuICAvKiogSGFuZGxlcyBhcmUgZm9jdXNhYmxlIChvbiBjbGljayBvciB3aXRoIHRhYikgYW5kIGNhbiBiZSBtb2RpZmllZCB1c2luZyB0aGUgZm9sbG93aW5nIGtleWJvYXJkIGNvbnRyb2xzOlxuICAgIExlZnQvYm90dG9tIGFycm93czogLTFcbiAgICBSaWdodC90b3AgYXJyb3dzOiArMVxuICAgIFBhZ2UtZG93bjogLTEwJVxuICAgIFBhZ2UtdXA6ICsxMCVcbiAgICBIb21lOiBtaW5pbXVtIHZhbHVlXG4gICAgRW5kOiBtYXhpbXVtIHZhbHVlXG4gICAqL1xuICBrZXlib2FyZFN1cHBvcnQ/OiBib29sZWFuID0gdHJ1ZTtcblxuICAvKiogSWYgeW91IGRpc3BsYXkgdGhlIHNsaWRlciBpbiBhbiBlbGVtZW50IHRoYXQgdXNlcyB0cmFuc2Zvcm06IHNjYWxlKDAuNSksIHNldCB0aGUgc2NhbGUgdmFsdWUgdG8gMlxuICAgIHNvIHRoYXQgdGhlIHNsaWRlciBpcyByZW5kZXJlZCBwcm9wZXJseSBhbmQgdGhlIGV2ZW50cyBhcmUgaGFuZGxlZCBjb3JyZWN0bHkuICovXG4gIHNjYWxlPzogbnVtYmVyID0gMTtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gZm9yY2UgdGhlIHZhbHVlKHMpIHRvIGJlIHJvdW5kZWQgdG8gdGhlIHN0ZXAsIGV2ZW4gd2hlbiBtb2RpZmllZCBmcm9tIHRoZSBvdXRzaWRlLlxuICAgIFdoZW4gc2V0IHRvIGZhbHNlLCBpZiB0aGUgbW9kZWwgdmFsdWVzIGFyZSBtb2RpZmllZCBmcm9tIG91dHNpZGUgdGhlIHNsaWRlciwgdGhleSBhcmUgbm90IHJvdW5kZWRcbiAgICBhbmQgY2FuIGJlIGJldHdlZW4gdHdvIHN0ZXBzLiAqL1xuICBlbmZvcmNlU3RlcD86IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBmb3JjZSB0aGUgdmFsdWUocykgdG8gYmUgbm9ybWFsaXNlZCB0byBhbGxvd2VkIHJhbmdlIChmbG9vciB0byBjZWlsKSwgZXZlbiB3aGVuIG1vZGlmaWVkIGZyb20gdGhlIG91dHNpZGUuXG4gICAgV2hlbiBzZXQgdG8gZmFsc2UsIGlmIHRoZSBtb2RlbCB2YWx1ZXMgYXJlIG1vZGlmaWVkIGZyb20gb3V0c2lkZSB0aGUgc2xpZGVyLCBhbmQgdGhleSBhcmUgb3V0c2lkZSBhbGxvd2VkIHJhbmdlLFxuICAgIHRoZSBzbGlkZXIgbWF5IGJlIHJlbmRlcmVkIGluY29ycmVjdGx5LiBIb3dldmVyLCBzZXR0aW5nIHRoaXMgdG8gZmFsc2UgbWF5IGJlIHVzZWZ1bCBpZiB5b3Ugd2FudCB0byBwZXJmb3JtIGN1c3RvbSBub3JtYWxpc2F0aW9uLiAqL1xuICBlbmZvcmNlUmFuZ2U/OiBib29sZWFuID0gdHJ1ZTtcblxuICAvKiogU2V0IHRvIHRydWUgdG8gZm9yY2UgdGhlIHZhbHVlKHMpIHRvIGJlIHJvdW5kZWQgdG8gdGhlIG5lYXJlc3Qgc3RlcCB2YWx1ZSwgZXZlbiB3aGVuIG1vZGlmaWVkIGZyb20gdGhlIG91dHNpZGUuXG4gICAgV2hlbiBzZXQgdG8gZmFsc2UsIGlmIHRoZSBtb2RlbCB2YWx1ZXMgYXJlIG1vZGlmaWVkIGZyb20gb3V0c2lkZSB0aGUgc2xpZGVyLCBhbmQgdGhleSBhcmUgb3V0c2lkZSBhbGxvd2VkIHJhbmdlLFxuICAgIHRoZSBzbGlkZXIgbWF5IGJlIHJlbmRlcmVkIGluY29ycmVjdGx5LiBIb3dldmVyLCBzZXR0aW5nIHRoaXMgdG8gZmFsc2UgbWF5IGJlIHVzZWZ1bCBpZiB5b3Ugd2FudCB0byBwZXJmb3JtIGN1c3RvbSBub3JtYWxpc2F0aW9uLiAqL1xuICBlbmZvcmNlU3RlcHNBcnJheT86IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBwcmV2ZW50IHRvIHVzZXIgZnJvbSBzd2l0Y2hpbmcgdGhlIG1pbiBhbmQgbWF4IGhhbmRsZXMuIEFwcGxpZXMgdG8gcmFuZ2Ugc2xpZGVyIG9ubHkuICovXG4gIG5vU3dpdGNoaW5nPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byBvbmx5IGJpbmQgZXZlbnRzIG9uIHNsaWRlciBoYW5kbGVzLiAqL1xuICBvbmx5QmluZEhhbmRsZXM/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIHNob3cgZ3JhcGhzIHJpZ2h0IHRvIGxlZnQuXG4gICAgSWYgdmVydGljYWwgaXMgdHJ1ZSBpdCB3aWxsIGJlIGZyb20gdG9wIHRvIGJvdHRvbSBhbmQgbGVmdCAvIHJpZ2h0IGFycm93IGZ1bmN0aW9ucyByZXZlcnNlZC4gKi9cbiAgcmlnaHRUb0xlZnQ/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFNldCB0byB0cnVlIHRvIHJldmVyc2Uga2V5Ym9hcmQgbmF2aWdhdGlvbjpcbiAgICBSaWdodC90b3AgYXJyb3dzOiAtMVxuICAgIExlZnQvYm90dG9tIGFycm93czogKzFcbiAgICBQYWdlLXVwOiAtMTAlXG4gICAgUGFnZS1kb3duOiArMTAlXG4gICAgRW5kOiBtaW5pbXVtIHZhbHVlXG4gICAgSG9tZTogbWF4aW11bSB2YWx1ZVxuICAgKi9cbiAgcmV2ZXJzZWRDb250cm9scz86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogU2V0IHRvIHRydWUgdG8ga2VlcCB0aGUgc2xpZGVyIGxhYmVscyBpbnNpZGUgdGhlIHNsaWRlciBib3VuZHMuICovXG4gIGJvdW5kUG9pbnRlckxhYmVscz86IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBTZXQgdG8gdHJ1ZSB0byB1c2UgYSBsb2dhcml0aG1pYyBzY2FsZSB0byBkaXNwbGF5IHRoZSBzbGlkZXIuICAqL1xuICBsb2dTY2FsZT86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBwb3NpdGlvbiBvbiB0aGUgc2xpZGVyIGZvciBhIGdpdmVuIHZhbHVlLlxuICAgIFRoZSBwb3NpdGlvbiBtdXN0IGJlIGEgcGVyY2VudGFnZSBiZXR3ZWVuIDAgYW5kIDEuXG4gICAgVGhlIGZ1bmN0aW9uIHNob3VsZCBiZSBtb25vdG9uaWNhbGx5IGluY3JlYXNpbmcgb3IgZGVjcmVhc2luZzsgb3RoZXJ3aXNlIHRoZSBzbGlkZXIgbWF5IGJlaGF2ZSBpbmNvcnJlY3RseS4gKi9cbiAgY3VzdG9tVmFsdWVUb1Bvc2l0aW9uPzogVmFsdWVUb1Bvc2l0aW9uRnVuY3Rpb24gPSBudWxsO1xuXG4gIC8qKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIGZvciBhIGdpdmVuIHBvc2l0aW9uIG9uIHRoZSBzbGlkZXIuXG4gICAgVGhlIHBvc2l0aW9uIGlzIGEgcGVyY2VudGFnZSBiZXR3ZWVuIDAgYW5kIDEuXG4gICAgVGhlIGZ1bmN0aW9uIHNob3VsZCBiZSBtb25vdG9uaWNhbGx5IGluY3JlYXNpbmcgb3IgZGVjcmVhc2luZzsgb3RoZXJ3aXNlIHRoZSBzbGlkZXIgbWF5IGJlaGF2ZSBpbmNvcnJlY3RseS4gKi9cbiAgY3VzdG9tUG9zaXRpb25Ub1ZhbHVlPzogUG9zaXRpb25Ub1ZhbHVlRnVuY3Rpb24gPSBudWxsO1xuXG4gIC8qKiBQcmVjaXNpb24gbGltaXQgZm9yIGNhbGN1bGF0ZWQgdmFsdWVzLlxuICAgIFZhbHVlcyB1c2VkIGluIGNhbGN1bGF0aW9ucyB3aWxsIGJlIHJvdW5kZWQgdG8gdGhpcyBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzXG4gICAgdG8gcHJldmVudCBhY2N1bXVsYXRpbmcgc21hbGwgZmxvYXRpbmctcG9pbnQgZXJyb3JzLiAqL1xuICBwcmVjaXNpb25MaW1pdD86IG51bWJlciA9IDEyO1xuXG4gIC8qKiBVc2UgdG8gZGlzcGxheSB0aGUgc2VsZWN0aW9uIGJhciBhcyBhIGdyYWRpZW50LlxuICAgIFRoZSBnaXZlbiBvYmplY3QgbXVzdCBjb250YWluIGZyb20gYW5kIHRvIHByb3BlcnRpZXMgd2hpY2ggYXJlIGNvbG9ycy4gKi9cbiAgc2VsZWN0aW9uQmFyR3JhZGllbnQ/OiB7ZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nfSA9IG51bGw7XG5cbiAgLyoqIFVzZSB0byBhZGQgYSBsYWJlbCBkaXJlY3RseSB0byB0aGUgc2xpZGVyIGZvciBhY2Nlc3NpYmlsaXR5LiBBZGRzIHRoZSBhcmlhLWxhYmVsIGF0dHJpYnV0ZS4gKi9cbiAgYXJpYUxhYmVsPzogc3RyaW5nID0gbnVsbDtcblxuICAvKiogVXNlIGluc3RlYWQgb2YgYXJpYUxhYmVsIHRvIHJlZmVyZW5jZSB0aGUgaWQgb2YgYW4gZWxlbWVudCB3aGljaCB3aWxsIGJlIHVzZWQgdG8gbGFiZWwgdGhlIHNsaWRlci5cbiAgICBBZGRzIHRoZSBhcmlhLWxhYmVsbGVkYnkgYXR0cmlidXRlLiAqL1xuICBhcmlhTGFiZWxsZWRCeT86IHN0cmluZyA9IG51bGw7XG5cbiAgLyoqIFVzZSB0byBhZGQgYSBsYWJlbCBkaXJlY3RseSB0byB0aGUgc2xpZGVyIHJhbmdlIGZvciBhY2Nlc3NpYmlsaXR5LiBBZGRzIHRoZSBhcmlhLWxhYmVsIGF0dHJpYnV0ZS4gKi9cbiAgYXJpYUxhYmVsSGlnaD86IHN0cmluZyA9IG51bGw7XG5cbiAgLyoqIFVzZSBpbnN0ZWFkIG9mIGFyaWFMYWJlbEhpZ2ggdG8gcmVmZXJlbmNlIHRoZSBpZCBvZiBhbiBlbGVtZW50IHdoaWNoIHdpbGwgYmUgdXNlZCB0byBsYWJlbCB0aGUgc2xpZGVyIHJhbmdlLlxuICAgIEFkZHMgdGhlIGFyaWEtbGFiZWxsZWRieSBhdHRyaWJ1dGUuICovXG4gIGFyaWFMYWJlbGxlZEJ5SGlnaD86IHN0cmluZyA9IG51bGw7XG5cbiAgLyoqIFVzZSB0byBpbmNyZWFzZSByZW5kZXJpbmcgcGVyZm9ybWFuY2UuIElmIHRoZSB2YWx1ZSBpcyBub3QgcHJvdmlkZWQsIHRoZSBzbGlkZXIgY2FsY3VsYXRlcyB0aGUgd2l0aC9oZWlnaHQgb2YgdGhlIGhhbmRsZSAqL1xuICBoYW5kbGVEaW1lbnNpb24/OiBudW1iZXIgPSBudWxsO1xuXG4gIC8qKiBVc2UgdG8gaW5jcmVhc2UgcmVuZGVyaW5nIHBlcmZvcm1hbmNlLiBJZiB0aGUgdmFsdWUgaXMgbm90IHByb3ZpZGVkLCB0aGUgc2xpZGVyIGNhbGN1bGF0ZXMgdGhlIHdpdGgvaGVpZ2h0IG9mIHRoZSBiYXIgKi9cbiAgYmFyRGltZW5zaW9uPzogbnVtYmVyID0gbnVsbDtcblxuICAvKiogRW5hYmxlL2Rpc2FibGUgQ1NTIGFuaW1hdGlvbnMgKi9cbiAgYW5pbWF0ZT86IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBFbmFibGUvZGlzYWJsZSBDU1MgYW5pbWF0aW9ucyB3aGlsZSBtb3ZpbmcgdGhlIHNsaWRlciAqL1xuICBhbmltYXRlT25Nb3ZlPzogYm9vbGVhbiA9IGZhbHNlO1xufVxuIl19