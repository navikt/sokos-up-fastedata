import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

/**
 * Hook for reading/writing a single URL search param as source of truth.
 * Uses functional updates to safely handle concurrent param changes.
 */
export function useUrlParam(
	name: string,
): [string | null, (value: string | null) => void] {
	const [searchParams, setSearchParams] = useSearchParams();
	const value = searchParams.get(name);

	const setValue = useCallback(
		(newValue: string | null) => {
			setSearchParams(
				(prev) => {
					const next = new URLSearchParams(prev);
					if (newValue === null || newValue === "") {
						next.delete(name);
					} else {
						next.set(name, newValue);
					}
					return next;
				},
				{ replace: true },
			);
		},
		[name, setSearchParams],
	);

	return [value, setValue];
}

/**
 * Hook for reading/writing a comma-separated array URL search param.
 * Empty arrays remove the param from the URL.
 */
export function useUrlArrayParam(
	name: string,
): [string[], (values: string[]) => void] {
	const [searchParams, setSearchParams] = useSearchParams();
	const raw = searchParams.get(name);

	const values = useMemo(
		() =>
			raw
				? raw
						.split(",")
						.map((s) => s.trim())
						.filter(Boolean)
				: [],
		[raw],
	);

	const setValues = useCallback(
		(newValues: string[]) => {
			setSearchParams(
				(prev) => {
					const next = new URLSearchParams(prev);
					if (newValues.length === 0) {
						next.delete(name);
					} else {
						next.set(name, newValues.join(","));
					}
					return next;
				},
				{ replace: true },
			);
		},
		[name, setSearchParams],
	);

	return [values, setValues];
}

/**
 * Hook for reading/writing a boolean URL search param.
 * Only writes "true" to the URL; removes the param when false.
 */
export function useUrlBooleanParam(
	name: string,
): [boolean, (value: boolean) => void] {
	const [searchParams, setSearchParams] = useSearchParams();
	const value = searchParams.get(name) === "true";

	const setValue = useCallback(
		(newValue: boolean) => {
			setSearchParams(
				(prev) => {
					const next = new URLSearchParams(prev);
					if (newValue) {
						next.set(name, "true");
					} else {
						next.delete(name);
					}
					return next;
				},
				{ replace: true },
			);
		},
		[name, setSearchParams],
	);

	return [value, setValue];
}

/**
 * Hook for reading/writing a numeric URL search param.
 * Returns the default value when the param is absent or not a valid number.
 */
export function useUrlNumberParam(
	name: string,
	defaultValue: number,
): [number, (value: number) => void] {
	const [searchParams, setSearchParams] = useSearchParams();
	const raw = searchParams.get(name);
	const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
	const value = Number.isNaN(parsed) ? defaultValue : parsed;

	const setValue = useCallback(
		(newValue: number) => {
			setSearchParams(
				(prev) => {
					const next = new URLSearchParams(prev);
					if (newValue === defaultValue) {
						next.delete(name);
					} else {
						next.set(name, String(newValue));
					}
					return next;
				},
				{ replace: true },
			);
		},
		[name, defaultValue, setSearchParams],
	);

	return [value, setValue];
}
