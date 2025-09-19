import { Link as ReactRouterLink } from "react-router";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { Heading } from "@navikt/ds-react";
import styles from "./AppCard.module.css";

interface AppCardProps {
  route: string;
  title: string;
  description: string;
  disabled?: boolean;
}

export default function AppCard(props: AppCardProps) {
  const content = (
    <div>
      <div className={styles["appcard-title"]}>
        <Heading level="3" size="xsmall">
          {props.title}
        </Heading>
      </div>
      <div className={styles["appcard-description"]}>
        {props.disabled ? "Kommer snart..." : props.description}
      </div>
      {!props.disabled && (
        <div className={styles.appcardarrow}>
          <ChevronRightIcon title="Chevron ikon" />
        </div>
      )}
    </div>
  );

  if (props.disabled) {
    return (
      <div className={`${styles["appcard"]} ${styles["disabled"]}`}>
        {content}
      </div>
    );
  }

  return (
    <ReactRouterLink
      className={styles["appcard"]}
      data-umami-event-app={props.title}
      to={props.route}
    >
      {content}
    </ReactRouterLink>
  );
}
