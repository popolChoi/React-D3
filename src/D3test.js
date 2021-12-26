import React, { Component } from 'react';
import { select } from "d3";

import * as d3 from "d3";


class D3test extends Component {
    svgRef = React.createRef();

    constructor(props){
        super(props);

    }

 

    componentDidMount(){
        const svg = select(this.svgRef.current); // selection 객체
     



        this.setResize();
        window.addEventListener('resize',() => this.setResize());
    }

    setResize(){

        const svg = select(this.svgRef.current); // selection 객체
        console.log(window.innerWidth);

        svg
        .attr("width", window.innerWidth - 2 + 'px')
        .attr("height", '300px')
        .style("border", "1px solid rgba(0,0,0,0.1)");

        const data = [...Array(10)].map(() => 30);
        svg.append("svg:rect")
        .attr("x", 1)
        .attr("y", 1)
        .attr("height", 100)
        .attr("width", 200);

        svg.append("svg:rect")
        .attr("x", 1)
        .attr("y", 102)
        .attr("height", 100)
        .attr("width", 200);

        // .selectAll('svg')
        // .data(data)
        // .enter()
        // .append('g')
        // .append('text')
        // .text((d) => d);


    }



    setSvgRef(){
        console.log('https://flamingotiger.github.io/frontend/d3/d3-barchart/');
        const svg = select(this.svgRef.current) // selection 객체

        const svgWidth = 300;
        const svgHeight = 300;
        const padding = 30;
        const data = [...Array(10)].map(() => 30);

      
        // svg
        // .attr("width", svgWidth)
        // .attr("height", svgHeight)
        // .style("border", "1px solid rgba(0,0,0,0.1)");


         // xAxis
         //axis 아랫방향으로 scale을 적용한 축을 그립니다.
        const xAxisScale = d3
        .scaleBand()
        .domain(data.map((d, i) => i)) // 실제값의 범위 index값
        .range([padding, svgWidth - padding]) // 변환할 값의 범위
        .padding(0.1); // 내부 padding
        const xAxis = d3.axisBottom().scale(xAxisScale);
        const xAxisTranslate = svgWidth - padding;
        svg
        .append("g")
        .call(xAxis)
        .attr("transform", `translate(0, ${xAxisTranslate})`);

        // yAxis
        const yAxisScale = d3
        .scaleLinear()
        .domain([0, d3.max(data)]) // 실제값의 범위
        .range([svgHeight - padding, padding]); // 변환할 값의 범위(역으로 처리)
        const yAxis = d3.axisLeft().scale(yAxisScale);
        svg
        .append("g")
        .call(yAxis)
        .attr("transform", `translate(${padding}, 0)`);

         // data
        svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("height", (d) => svgHeight - yAxisScale(d) - padding)
        .attr("width", xAxisScale.bandwidth())
        .attr("x", (d, i) => xAxisScale(i))
        .attr("y", (d) => yAxisScale(d))
        .attr("fill", "orange");
    }





    render() {
        return (
        <svg ref={this.svgRef} >

        </svg>
        );
    } 

}

export default D3test;
