${
    using Typewriter.Extensions.Types;

    string LoudName(Property property)
    {
        return property.Name.ToUpperInvariant();
    }
}
module BoardGame.Api.Models {
    $Classes(*Models*)[
    export class $Name {
        $Properties[
        public $name: $Type = $Type[$Default];]
    }]
}