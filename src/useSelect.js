import {
    useEffect,
    useMemo,
    useState,
    useRef, useCallback,
} from 'react';
import groupOptions from './lib/groupOptions';
import getOptions from './lib/getOptions';
import getDisplayValue from './lib/getDisplayValue';
import useFetch from './useFetch';
import getValues from './lib/getValues';
import useHighlight from './useHighlight';

export default function useSelect({
    value: defaultValue = null,
    options: defaultOptions = [],
    search: canSearch = false,
    multiple = false,
    disabled = false,
    closeOnSelect = true,
    getOptions: getOptionsFn = null,
    filterOptions = null,
    onChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    debounce = 0,
}) {
    const ref = useRef(null);
    const valueRef = useRef(undefined);
    const [value, setValue] = useState(null);
    const [search, setSearch] = useState('');
    const [focus, setFocus] = useState(false);
    const { options, fetching } = useFetch(search, defaultOptions, {
        getOptions: getOptionsFn,
        filterOptions,
        debounceTime: debounce,
    });

    const onSelect = useCallback((newValue) => {
        const newOption = getOptions(
            newValue,
            value,
            (Array.isArray(value)) ? [...value, ...options] : options,
            multiple,
        );

        setValue(newOption);
        onChange(getValues(newOption), newOption);

        if (closeOnSelect) {
            ref.current.blur();
        }
    }, [closeOnSelect, multiple, onChange, value, options]);

    const [highlighted, keyboardEvents] = useHighlight(-1, options, onSelect, ref);
    const snapshot = useMemo(() => ({
        options: groupOptions(options),
        option: value,
        displayValue: getDisplayValue(value),
        value: getValues(value),
        search,
        fetching,
        focus,
        highlighted,
        disabled,
    }), [disabled, fetching, focus, highlighted, search, value, options]);

    const onMouseDown = useCallback((e) => {
        e.preventDefault();
        onSelect(e.currentTarget.value);
    }, [onSelect]);

    const onFocusCb = useCallback((e) => {
        setFocus(true);
        onFocus(e);
    }, [onFocus]);

    const onBlurCb = useCallback((e) => {
        setFocus(false);
        setSearch('');
        onBlur(e);
    }, [onBlur]);

    const valueProps = useMemo(() => ({
        tabIndex: '0',
        readOnly: !canSearch,
        ...keyboardEvents,
        onFocus: onFocusCb,
        onBlur: onBlurCb,
        onChange: (canSearch) ? ({ target }) => setSearch(target.value) : null,
        disabled,
        ref,
    }), [canSearch, keyboardEvents, onFocusCb, onBlurCb, disabled]);

    const optionProps = useMemo(() => ({
        tabIndex: '-1',
        onMouseDown,
    }), [onMouseDown]);

    useEffect(() => {
        if (valueRef.current === defaultValue || !defaultValue) {
            return;
        }

        const newValue = getOptions(defaultValue, null, options, multiple);
        if (newValue) {
            valueRef.current = defaultValue;
            setValue(newValue);
        }
    }, [defaultValue, multiple, options]);

    return [snapshot, valueProps, optionProps, setValue];
}
