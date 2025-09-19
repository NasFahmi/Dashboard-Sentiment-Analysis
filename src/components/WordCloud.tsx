import React, { useEffect, useRef } from "react";
import { scaleLinear } from "d3-scale";
import { interpolateRgb } from "d3";
import { min, max } from "d3-array";
import * as d3 from "d3-selection";
import cloud from "d3-cloud";

export type WordInput = {
  text: string;
  value: number;
  sentiment?: "positive" | "negative" | "neutral";
};

// extend hasil dari d3-cloud
type CloudWord = Omit<cloud.Word, "size"> & {
  size: number; // font size (dari d3-cloud)
  value: number; // nilai asli dari input
  sentiment?: "positive" | "negative" | "neutral";
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
    if (!words.length) return;

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

    const capitalize = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const layout = cloud<CloudWord>()
      .size([width, height])
      .words(
        words.map((d) => ({
          text: capitalize(d.text),
          size: d.value, // sementara -> nanti dipetakan lewat fontScale
          value: d.value,
          sentiment: d.sentiment,
        }))
      )
      .padding(5)
      //   .rotate(() => (Math.random() > 0.5 ? 0 : 90))
      .rotate(0)
      .font(font)
      .fontSize((d) => fontScale(d.value)) // pakai value asli
      .on("end", draw);

    layout.start();

    function draw(cloudWords: CloudWord[]): void {
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
        .data(cloudWords, (d: any) => d.text)
        .enter()
        .append("text")
        .style("font-size", (d) => `${d.size}px`)
        .style("font-weight", (d) => (d.value === maxValue ? "800" : "500"))
        .style("font-family", font)
        .style("fill", (d) =>
          d.sentiment === "positive"
            ? "#2ecc71"
            : d.sentiment === "negative"
            ? "#e74c3c"
            : "#95a5a6"
        )
        .style("fill-opacity", (d) => opacityScale(d.value))
        .attr("text-anchor", "middle")
        .attr(
          "transform",
          (d) => `translate(${d.x},${d.y}) rotate(${d.rotate})`
        )
        .text((d) => d.text || "");
    }
  }, [words, width, height, font]);

  return <div ref={ref}></div>;
};

export default WordCloud;
