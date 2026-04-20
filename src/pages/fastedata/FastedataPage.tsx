import { Heading } from "@navikt/ds-react";
import commonstyles from "../../styles/commonstyles.module.css";
import AppCard from "./AppCard";
import styles from "./Fastedata.module.css";
import { routeSections } from "./routes";

export default function FastedataPage() {
	return (
		<div className={commonstyles.container}>
			<div className={styles["content-wrapper"]}>
				<Heading
					level="1"
					size="medium"
					spacing
					className={commonstyles["page-heading"]}
				>
					Faste data
				</Heading>
				{routeSections.map((section) => (
					<div key={section.title} className={styles.section}>
						<Heading level="2" size="small" spacing>
							{section.title}
						</Heading>

						<div
							className={`${styles["card-grid"]} ${
								section.title === "Trekk" ? styles["compact-card-grid"] : ""
							}`}
						>
							{section.routes.map((app) => (
								<AppCard
									key={app.title}
									title={app.title}
									description={app.description}
									route={app.route}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
