export const Timeline = ({step = 'any', duration = NaN, value = 0}) => {
    const floorDuration = Math.floor(duration)
    const floorValue = Math.floor(value)

    return (<div className="timeline">
        <span className="min-value">{floorValue}</span>
        <input type="range"
               disabled={floorDuration <= 0}
               step={step}
               max={duration}
               value={floorValue}
               min="0"
               aria-label="Time scrubber"
               aria-valuetext={`elapsed time: ${floorValue}`}
               aria-description={`total time: ${floorDuration}`}
        />
        <span className="max-value">{floorDuration}</span>
    </div>)
}