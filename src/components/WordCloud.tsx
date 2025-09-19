import React, { useEffect, useRef } from "react";
import { scaleLinear } from "d3-scale";
import { min, max } from "d3-array";
import * as d3 from "d3-selection";
import cloud from "d3-cloud";

export type WordInput = {
  text: string;
  value: number;
  sentiment?: "positive" | "negative" | "neutral";
};

// Extended hasil dari d3-cloud dengan typing yang benar
type CloudWord = cloud.Word & {
  value: number; // nilai asli dari input
  sentiment?: "positive" | "negative" | "neutral";
  size?: number; // font size (dari d3-cloud) - buat optional karena bisa undefined
  x?: number; // koordinat x (dari d3-cloud)
  y?: number; // koordinat y (dari d3-cloud) 
  rotate?: number; // rotasi (dari d3-cloud)
};

interface WordCloudProps {
  words?: WordInput[];
  width?: number;
  height?: number;
  font?: string;
}

const WordCloud: React.FC<WordCloudProps> = ({
  words = [],
  width = 600,
  height = 400,
  font = "Plus Jakarta Sans",
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!words.length || !ref.current) return;

    const minValue = min(words, (d) => d.value) || 1;
    const maxValue = max(words, (d) => d.value) || 1;

    // Scale untuk font size
    const fontScale = scaleLinear()
      .domain([minValue, maxValue])
      .range([12, 80]);

    // Scale untuk transparansi
    const opacityScale = scaleLinear()
      .domain([minValue, maxValue])
      .range([0.3, 1]);

    const capitalize = (str: string): string =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const layout = cloud<CloudWord>()
      .size([width, height])
      .words(
        words.map((d): CloudWord => ({
          text: capitalize(d.text),
          size: fontScale(d.value), // langsung pakai fontScale
          value: d.value,
          sentiment: d.sentiment,
        }))
      )
      .padding(5)
      .rotate(() => 0) // Consistent function return type
      .font(font)
      .fontSize((d: CloudWord) => {
        // Type guard untuk memastikan d.value ada
        return d.value ? fontScale(d.value) : 12;
      })
      .on("end", draw);

    layout.start();

    function draw(cloudWords: CloudWord[]): void {
      if (!ref.current) return;

      // Clear previous content
      d3.select(ref.current).selectAll("*").remove();

      const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      svg
        .selectAll("text")
        .data(cloudWords)
        .enter()
        .append("text")
        .style("font-size", (d: CloudWord) => `${d.size || 12}px`)
        .style("font-weight", (d: CloudWord) => 
          (d.value === maxValue ? "800" : "500")
        )
        .style("font-family", font)
        .style("fill", (d: CloudWord) => {
          switch (d.sentiment) {
            case "positive":
              return "#2ecc71";
            case "negative":
              return "#e74c3c";
            default:
              return "#95a5a6";
          }
        })
        .style("fill-opacity", (d: CloudWord) => 
          d.value ? opacityScale(d.value) : 0.5
        )
        .attr("text-anchor", "middle")
        .attr("transform", (d: CloudWord) => 
          `translate(${d.x || 0},${d.y || 0}) rotate(${d.rotate || 0})`
        )
        .text((d: CloudWord) => d.text || "");
    }

    // Cleanup function
    return () => {
      if (ref.current) {
        d3.select(ref.current).selectAll("*").remove();
      }
    };
  }, [words, width, height, font]);

  return <div ref={ref}></div>;
};

export default WordCloud;