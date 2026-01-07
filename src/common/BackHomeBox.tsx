import { ArrowLeftIcon, ChevronRightDoubleIcon } from "@navikt/aksel-icons";
import { Link as RouterLink } from "react-router";
import { ROOT } from "../util/paths";
import styles from "./BackHomeBox.module.css";

type Props = {
	to?: string;
	label?: string;
	breadcrumbs?: {
		label: string;
		to?: string;
	}[];
	ariaLabel?: string;
};

const BackHomeBox = ({
	to = ROOT,
	label = "Tilbake til oversikt",
	breadcrumbs,
	ariaLabel = "Brødsmulesti",
}: Props) => {
	if (breadcrumbs && breadcrumbs.length > 0) {
		return (
			<nav className={styles.container} aria-label={ariaLabel}>
				<ol className={styles.breadcrumbs}>
					{breadcrumbs.map((crumb, index) => {
						const isLast = index === breadcrumbs.length - 1;
						const key = `${crumb.label}-${index}`;

						const content =
							crumb.to && !isLast ? (
								<RouterLink to={crumb.to} className={styles["breadcrumb-link"]}>
									{crumb.label}
								</RouterLink>
							) : (
								<span
									className={`${styles["breadcrumb-link"]} ${styles.current}`}
									{...(isLast ? { "aria-current": "page" } : {})}
								>
									{crumb.label}
								</span>
							);

						return (
							<li key={key} className={styles["breadcrumb-item"]}>
								{content}
								{!isLast && (
									<ChevronRightDoubleIcon className={styles.separator} />
								)}
							</li>
						);
					})}
				</ol>
			</nav>
		);
	}

	return (
		<div className={styles.container}>
			<RouterLink to={to} className={styles.link}>
				<ArrowLeftIcon className={styles.ikon} />
				{label}
			</RouterLink>
		</div>
	);
};

export default BackHomeBox;
