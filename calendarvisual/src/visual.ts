/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
"use strict";

import "core-js/stable";
import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;

import { VisualSettings } from "./settings";
import * as d3 from "d3";
export class Visual implements IVisual {
    private root: d3.Selection<any>;
    private svg: d3.Selection<SVGElement>;
    calendar: d3.Selection<SVGElement>;


    constructor(options: VisualConstructorOptions) {
        try {
            debugger;
            this.root = d3.select(options.element);

            this.svg = this.root
                .append("svg")
                .classed("calendar-visual", true);

            this.calendar = this.svg.append("g")
                .classed("calendar", true);

            this.root
                .append("div")
                .classed("date-picker", true);

        }
        catch (e) {
            debugger;
        }
    }

    public update(options: VisualUpdateOptions) {
        try {
            debugger;
            const date_picker_element = document.querySelector('.date-picker');
            const selected_date_element = document.querySelector('.date-picker .selected-date');
            const dates_element = document.querySelector('.date-picker .dates');
            const mth_element = document.querySelector('.date-picker .dates .month .mth');
            const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
            const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
            const weekDays_element = document.querySelector('.date-picker .dates .week');
            const days_element = document.querySelector('.date-picker .dates .days');


            const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
            const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

            //  На этой строке падает, потому что здесь date_picker_element равен null
            date_picker_element.addEventListener('click', toggleDatePicker);

            let date = new Date();
            let day = date.getDate();
            let dayOfWeek = date.getDay();
            let month = date.getMonth();
            let year = date.getFullYear();

            let selectedDate = date;
            let selectedDay = day;
            let selectedMonth = month;
            let selectedYear = year;
            let selectedDayOfWeek = dayOfWeek;

            mth_element.textContent = months[month] + ' ' + year;


            date_picker_element.addEventListener('click', toggleDatePicker);


            function toggleDatePicker(e) {
                if (!checkEventPathForClass(e.path, 'dates')) {
                    dates_element.classList.toggle('active');
                }
            }

            function checkEventPathForClass(path, selector) {
                for (let i = 0; i < path.length; i++) {
                    if (path[i].classList && path[i].classList.contains(selector)) {
                        return true;
                    }
                }

                return false;
            }

            function populatedates(e) {
                let datePickerHeight = 60;
                let datePickerWidth = 80;
                d3.select("svg")
                    .selectAll("rect")
                    .data()
                    //.enter()
                   // .append("rect")

            }

            function formatDate(d) { //formatting calendar
                let day = d.getDate();
                if (day < 10) {
                    day = '0' + day;
                }
                let month = d.getMonth() + 1;
                if (month < 10) {
                    month = '0' + month;
                }
                let year = d.getFullYear();
                return day + '.' + month + '.' + year;
            }
        }
        catch (e) {
            debugger;
        }

    }

    private static parseSettings(dataView: DataView): VisualSettings {
        return <VisualSettings>VisualSettings.parse(dataView);
    }

    /**
     * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
     * objects and properties you want to expose to the users in the property pane.
     *
     */
    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
        return []; //VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }
}