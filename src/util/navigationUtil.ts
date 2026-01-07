import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

/**
 * Custom hook for detail pages that require state from navigation.
 * Redirects to fallback route if required state is missing.
 *
 * @param redirectPath - Path to redirect to if state is missing
 * @returns The location state or null if missing
 */
export function useRequiredLocationState<T>(redirectPath: string): T | null {
	const location = useLocation();
	const navigate = useNavigate();
	const state = location.state as T | undefined;

	useEffect(() => {
		if (!state) {
			navigate(redirectPath, { replace: true });
		}
	}, [state, navigate, redirectPath]);

	return state || null;
}

/**
 * Parses a comma-separated string into an array of trimmed non-empty strings
 *
 * @param value - Comma-separated string
 * @returns Array of trimmed strings
 */
export function parseCommaSeparated(value?: string): string[] {
	if (!value) return [];

	return value
		.split(",")
		.map((entry) => entry.trim())
		.filter((entry) => entry.length > 0);
}
