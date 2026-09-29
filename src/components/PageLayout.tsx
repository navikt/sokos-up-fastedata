import { ArrowLeftIcon, ChevronRightDoubleIcon } from "@navikt/aksel-icons";
import { Heading } from "@navikt/ds-react";
import type React from "react";
import { Link } from "react-router";
import commonstyles from "../styles/commonstyles.module.css";
import { ROOT } from "../util/paths";
import styles from "./PageLayout.module.css";

interface PageLayoutProps {
	title: string;
	children: React.ReactNode;
	breadcrumbs?: { label: string; to?: string }[];
	contentWrapperClassName?: string;
}

const PageLayout = ({
	title,
	children,
	breadcrumbs,
	contentWrapperClassName,
}: PageLayoutProps) => (
	<div className={commonstyles.container}>
		<div
			className={
				contentWrapperClassName
					? `${commonstyles["content-wrapper"]} ${contentWrapperClassName}`
					: commonstyles["content-wrapper"]
			}
		>
			<Heading
				spacing
				size="medium"
				level="1"
				className={commonstyles["page-heading"]}
			>
				{title}
			</Heading>

			{breadcrumbs && breadcrumbs.length > 0 ? (
				<nav className={styles["nav-container"]} aria-label="Brødsmulesti">
					<ol className={styles.breadcrumbs}>
						{breadcrumbs.map((crumb, index) => {
							const isLast = index === breadcrumbs.length - 1;
							const key = `${crumb.label}-${index}`;
							const content =
								crumb.to && !isLast ? (
									<Link to={crumb.to} className={styles["breadcrumb-link"]}>
										{crumb.label}
									</Link>
								) : (
									<span
										className={`${styles["breadcrumb-link"]} ${styles.current}`}
										{...(isLast ? { "aria-current": "page" as const } : {})}
									>
										{crumb.label}
									</span>
								);
							return (
								<li key={key} className={styles["breadcrumb-item"]}>
									{content}
									{!isLast && (
										<ChevronRightDoubleIcon
											aria-hidden
											className={styles.separator}
										/>
									)}
								</li>
							);
						})}
					</ol>
				</nav>
			) : (
				<div className={styles["nav-container"]}>
					<Link to={ROOT} className={styles.link}>
						<ArrowLeftIcon aria-hidden className={styles.ikon} />
						Tilbake til oversikt
					</Link>
				</div>
			)}

			{children}
		</div>
	</div>
);

export default PageLayout;
