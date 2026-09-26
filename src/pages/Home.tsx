import { Heading, LinkCard } from "@navikt/ds-react";
import { Link } from "react-router";
import commonstyles from "../styles/commonstyles.module.css";
import styles from "./Home.module.css";
import { routeSections } from "./routes";

export default function Home() {
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

						<div className={styles["card-grid"]}>
							{section.routes.map((app) => (
								<LinkCard
									key={app.title}
									as="article"
									className={styles["link-card"]}
								>
									<LinkCard.Title as="h3">
										<LinkCard.Anchor asChild>
											<Link to={app.route} data-umami-event-app={app.title}>
												{app.title}
											</Link>
										</LinkCard.Anchor>
									</LinkCard.Title>
									<LinkCard.Description>{app.description}</LinkCard.Description>
								</LinkCard>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
