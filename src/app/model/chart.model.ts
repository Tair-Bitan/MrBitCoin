import { ChartType } from "angular-google-charts";

export interface Chart {
    title: string,
    type: ChartType,
    data: Array<Array<string | number>>,
    columnNames: Array<string>,
    width: number,
    height: number,
}
