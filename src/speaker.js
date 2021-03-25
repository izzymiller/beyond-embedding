import React from "react"
import s from "./speaker.module.css"
import { Video } from "@code-hike/player"

export const SpeakerPanel = React.forwardRef(
  SpeakerPanelWithRef
)

function SpeakerPanelWithRef(
  {
    videoSteps,
    changeStep,
    onTimeChange,
    progressPercentage,
    caption,
  },
  playerRef
) {
  return (
    <div className={s.video}>
      <div style={{ height: 182, position: "relative" }}>
        <div
          style={{
            height: "100%",
          }}
        >
          <Video
            steps={videoSteps}
            containerStyle={{
              top: -6,
              height: 229,
            }}
            style={{
              height: "100%",
              width: 388,
            }}
            onStepChange={changeStep}
            onTimeChange={onTimeChange}
            ref={playerRef}
          />
        </div>
      </div>
      <div className={s.details}>
        <div className={s.captions}>{caption}</div>
      </div>
    </div>
  )
}
