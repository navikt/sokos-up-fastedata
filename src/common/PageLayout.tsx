import { Heading } from "@navikt/ds-react";
import type React from "react";
import commonstyles from "../styles/commonstyles.module.css";
import BackHomeBox from "./BackHomeBox";

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

			<BackHomeBox breadcrumbs={breadcrumbs} />

			{children}
		</div>
	</div>
);

export default PageLayout;
