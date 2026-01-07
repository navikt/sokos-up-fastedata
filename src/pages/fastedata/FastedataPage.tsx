import { Heading } from "@navikt/ds-react";
import commonstyles from "../../styles/commonstyles.module.css";
import AppCard from "./AppCard";
import styles from "./Fastedata.module.css";
import { routes } from "./routes";

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
				<Heading level="2" size="small" spacing>
					Oppdrag
				</Heading>

				<div className={styles["card-grid"]}>
					{routes.map((app) => (
						<AppCard
							key={app.title}
							title={app.title}
							description={app.description}
							route={app.route}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
