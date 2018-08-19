export class Factlet {
    id: number;
    contentMarkdown: string;

    // these are calculated on the fly, and not persisted
    viewDate?: string; // todo make this a date
    viewContent?: string; // just the content without date and tags
    viewTags?: string[];
}
