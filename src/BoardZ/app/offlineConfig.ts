export class OfflineConfig {

    private _intervalInSeconds: number = 10;

    /**
     * Returns the interval used to do connectivity checks in msec
     * @returns {number}
     */
    public get checkInterval(): number {
        return this._intervalInSeconds * 1000;
    }

    /**
     * How fast has the ping to be in order to get ConnectionState.Good
     * @returns {number}
     */
    public get maxDurationForGood(): number {
        return 50;
    }

    /**
     * How fast has the ping to be in order to get ConnectionState.Normal
     * @returns {number}
     */
    public get maxDurationForNormal(): number {
        return 190;
    }

    /**
     * How fast has the ping to be in order to get ConnectionState.ToSlow
     * @returns {number}
     */
    public get maxDurationForToSlow(): number {
        return 240;
    }

    /**
     * How fast has the ping to be in order to get ConnectionState.Offline
     * @returns {number}
     */
    public get absoluteTimeoutAt(): number {
        return 320;
    }
}
