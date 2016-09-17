export class AgeRating{
    public id: string;
    public name:string;
    public colorIndicator: string;


    public static fromRawJson(rawJson: any): AgeRating{
        if(!rawJson){
            return new AgeRating();
        }
        let instance: AgeRating = new AgeRating();
        instance.id = rawJson.id || null;
        instance.name = rawJson.name || null;
        instance.colorIndicator = rawJson.colorIndicator || null;
        return instance;
    }
}
