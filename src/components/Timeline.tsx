import {ChangeEvent, MouseEvent, useEffect, useState} from "react";
import {delay} from '@utils/utils.ts'
import '@styles/Timeline.css'

interface Timeline {
    step?: string;
    duration: number;
    value: number;
    onChange: () => void;
    onMouseDown: () => void;
    onMouseUp: ({value}: { value: number }) => void;
}

const finishScrubbingDelayMs = 500

export const Timeline = ({
                             step = 'any',
                             duration = NaN,
                             value = 0,
                             onChange,
                             onMouseUp,
                             onMouseDown,}: Timeline) => {
    const floorDuration = Math.floor(duration)
    const floorValue = Math.floor(value)
    const [timelineValue, setTimelineValue] = useState(floorValue)
    const [isScrubbing, setIsScrubbing] = useState(false)

    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const newTimelineValue = Number(ev.target.value)

        setTimelineValue(Math.floor(newTimelineValue))
    }
    const handleMouseDown = () => {
        setIsScrubbing(true)
        onMouseDown()
    }
    const handleMouseUp = async (ev: MouseEvent<HTMLInputElement>) => {
        onMouseUp({value: timelineValue})
        await delay(finishScrubbingDelayMs)
        setIsScrubbing(false)
    }

    useEffect(() => {
        if (!isScrubbing) {
            setTimelineValue(Math.floor(value))
        }
    }, [value, isScrubbing])

    return (<div className="timeline">
        <span className="min-value">{floorValue}</span>
        <input className='input' type="range"
               disabled={floorDuration <= 0}
               onChange={handleChange}
               onMouseDown={handleMouseDown}
               onMouseUp={handleMouseUp}
               step={step}
               max={duration}
               value={timelineValue}
               min="0"
               aria-label="Time scrubber"
               aria-valuetext={`elapsed time: ${floorValue}`}
               aria-description={`total time: ${floorDuration}`}
        />
        <span className="max-value">{floorDuration}</span>
    </div>)
}