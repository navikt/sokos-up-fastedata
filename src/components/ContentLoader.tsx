import { Loader } from "@navikt/ds-react";
import commonstyles from "../styles/commonstyles.module.css";
import styles from "./ContentLoader.module.css";

export default function ContentLoader() {
	return (
		<div className={commonstyles.container}>
			<div className={commonstyles["content-wrapper"]}>
				<div className={styles["loader-container"]}>
					<Loader
						size="2xlarge"
						variant="interaction"
						title="Laster inn data..."
					/>
				</div>
			</div>
		</div>
	);
}
