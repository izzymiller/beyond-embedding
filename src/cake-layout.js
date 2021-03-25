import React from "react"
import s from "./cake.module.css"
import { MiniEditor } from "@code-hike/mini-editor"
import { MiniBrowser } from "@code-hike/mini-browser"
import { useTimeData } from "@code-hike/player"
import { useSpring } from "use-spring"
import { sim } from "@code-hike/sim-user"
import { SpeakerPanel } from "./speaker"
import { Details } from "./details"
import { FitToViewport } from "react-fit-to-viewport"
import { Gradient } from "./gradient"

export function CakeLayout({
  videoSteps,
  browserSteps,
  editorSteps,
  captionSteps,
}) {
  const [stepIndex, changeStep] = React.useState(0)
  const playerRef = React.useRef()
  const browserRef = React.useRef()
  const [videoTime, setVideoTime] = React.useState(
    videoSteps[0].start
  )
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress] = useSpring(stepIndex, {
    decimals: 3,
    stiffness: 80,
    damping: 48,
    mass: 8,
  })
  const backward = stepIndex < progress

  const { currentSeconds, totalSeconds } = useTimeData({
    steps: videoSteps,
    stepIndex,
    videoTime,
  })

  const caption = useCaption(
    captionSteps,
    stepIndex,
    videoTime
  )

  const forwards = () => {
    changeStep(stepIndex + 1)
  }

  const backwards = () => {
    if(stepIndex == 0) {
      console.log("already at 0")
    } else {
      changeStep(stepIndex - 1)
    }
  }

  const play = () => {
    playerRef.current.play()
    setIsPlaying(true)
  }
  const pause = () => {
    playerRef.current.pause()
    setIsPlaying(false)
  }

  const onTimeChange = (newTime, oldTime) => {
    // currentStep.actions
    const browserStep = browserSteps[stepIndex]
    const actions = browserStep.actions || []
    const action = actions.find(
      a => oldTime < a.on && a.on <= newTime
    )

    if (action) {
      const document =
        browserRef.current.contentWindow.document
      sim(action, document)
    }

    setVideoTime(newTime)
  }

  return (
    <div className={s.page}>
      <style global jsx>{`
        html,
        body,
        div#__next {
          height: 100%;
          margin: 0;
          overflow: hidden;
        }
        .ch-frame .ch-editor-body {
          padding: 0;
        }

        .ch-frame-content {
          background: black;
        }
      `}</style>
      <FitToViewport
        as="main"
        className={s.main}
        autoRotateAt={767}
        width={1024}
        height={576}
      >
        <div className={s.grid}>
          <div className={s.div1}>
            <MiniEditor
              style={{ height: "100%" }}
              steps={editorSteps}
              progress={progress}
              backward={backward}
            />
          </div>
          <div className={s.div2}>
            <MiniBrowser
              style={{ height: "100%" }}
              steps={browserSteps}
              progress={progress}
              backward={backward}
              prependOrigin={true}
              ref={browserRef}
            />
          </div>
          <Gradient className={s.div3}>
            <SpeakerPanel
              ref={playerRef}
              videoSteps={videoSteps}
              changeStep={changeStep}
              onTimeChange={onTimeChange}
              caption={caption}
              progressPercentage={
                (100 * currentSeconds) / totalSeconds
              }
            />
          </Gradient>
          <div className="controls">
          <button onClick={forwards}>Forwards</button>
          <button onClick={backwards}>Backwards</button>
          <button onClick={pause}>Pause</button>
          <button onClick={play}>Play</button>
          <span style={{color:"white"}}>{stepIndex}</span>
        </div>
        </div>
        <Details
          videoTime={videoTime}
          totalSeconds={totalSeconds}
          isPlaying={isPlaying}
          play={play}
          pause={pause}
        />
      </FitToViewport>
    </div>
  )
}

function useCaption(captionSteps, stepIndex, videoTime) {
  const stepCaptions = captionSteps[stepIndex]

  if (!stepCaptions) return null

  const caption = stepCaptions.find(
    ({ start, end }) =>
      start <= videoTime && videoTime < end
  )

  return caption ? caption.text : null
}
