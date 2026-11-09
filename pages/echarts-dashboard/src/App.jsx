import { useState } from "react";
import ReactECharts from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { LineChart, BarChart, PieChart, GraphChart } from "echarts/charts";
import {
  AriaComponent,
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import {
  Activity,
  ArrowUpRight,
  Globe2,
  Server,
  ShieldCheck,
  Zap,
} from "lucide-react";

echarts.use([
  LineChart,
  BarChart,
  PieChart,
  GraphChart,
  AriaComponent,
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
  CanvasRenderer,
]);

const nodes = [
  { name: "Singapore", region: "Asia Pacific", value: 24 },
  { name: "Tokyo", region: "Asia Pacific", value: 19 },
  { name: "Sydney", region: "Asia Pacific", value: 67 },
  { name: "Frankfurt", region: "Europe", value: 32 },
  { name: "San Francisco", region: "North America", value: 28 },
  { name: "New York", region: "North America", value: 35 },
];
const periods = {
  "24h": ["Last 24 hours", 24],
  "7d": ["Last 7 days", 7],
  "30d": ["Last 30 days", 30],
};
const colors = ["#38bdf8", "#818cf8", "#2dd4bf", "#fbbf24"];
const common = {
  backgroundColor: "transparent",
  color: colors,
  textStyle: { fontFamily: "system-ui, sans-serif" },
  aria: { enabled: true },
  tooltip: { trigger: "item", confine: true },
  toolbox: {
    top: 25,
    right: 0,
    feature: {
      dataView: {
        readOnly: true,
        title: "View data",
        lang: ["Data view", "Close", "Refresh"],
      },
      restore: { title: "Reset" },
      saveAsImage: { title: "Save image", backgroundColor: "#101a2e" },
    },
  },
};
const axis = {
  axisLine: { lineStyle: { color: "#334155" } },
  axisLabel: { color: "#94a3b8" },
  splitLine: { lineStyle: { color: "#ffffff09" } },
};

function Chart({ title, subtitle, option, wide = false }) {
  return (
    <section
      className={`min-w-0 rounded-2xl border border-white/8 bg-[#101a2e] p-5 ${wide ? "lg:col-span-2" : ""}`}
    >
      <h2 className="text-sm font-medium text-slate-100">{title}</h2>
      <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
      <ReactECharts
        echarts={echarts}
        theme="dark"
        opts={{ locale: "EN" }}
        notMerge
        option={{ ...common, ...option }}
        style={{ height: 320, marginTop: 16 }}
      />
    </section>
  );
}

export default function App() {
  const [range, setRange] = useState("24h");
  const [region, setRegion] = useState("Global");
  const visibleNodes = nodes.filter(
    (node) => region === "Global" || node.region === region,
  );
  const count = periods[range][1];
  const factor = region === "Global" ? 1 : 0.48;
  const trend = Array.from({ length: count }, (_, i) => ({
    time:
      range === "24h" ? `${String(i).padStart(2, "0")}:00` : `Day ${i + 1}`,
    Requests: Math.round((56 + Math.sin(i * 0.7) * 17 + i * 1.3) * factor),
    "Cache hits": Math.round((43 + Math.sin(i * 0.7) * 12 + i) * factor),
  }));
  const requests = (
    trend.reduce((sum, row) => sum + row.Requests, 0) / 1000
  ).toFixed(2);
  const avgLatency = Math.round(
    visibleNodes.reduce((sum, node) => sum + node.value, 0) /
      visibleNodes.length,
  );
  return (
    <div className="min-h-screen bg-[#080f1e] text-slate-200">
      <header className="border-b border-white/8 bg-[#0d1627]">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-5 py-5 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <Activity className="text-sky-400" />
            <strong className="text-xl tracking-widest">ESA Pages</strong>
            <span className="border-l border-slate-700 pl-3 text-xs text-slate-400">
              Global Edge Observatory
            </span>
          </a>
          <a
            className="text-xs text-slate-400 hover:text-sky-300"
            href="https://echarts.apache.org/"
            target="_blank"
            rel="noreferrer"
          >
            Powered by Apache ECharts ↗
          </a>
        </div>
      </header>
      <main className="mx-auto max-w-[1600px] space-y-6 px-5 py-8 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-2 text-[10px] tracking-[.25em] text-sky-400">
              NETWORK INTELLIGENCE / OVERVIEW
            </p>
            <h1 className="text-2xl font-semibold text-white sm:text-3xl">
              Discover more in your data.
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              aria-label="Select region"
              className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option>Global</option>
              <option>Asia Pacific</option>
            </select>
            <div className="flex rounded-lg border border-white/10 bg-slate-900 p-1">
              {Object.entries(periods).map(([key, [label]]) => (
                <button
                  key={key}
                  aria-pressed={range === key}
                  onClick={() => setRange(key)}
                  className={`rounded-md px-3 py-1.5 text-xs ${range === key ? "bg-sky-400/15 text-sky-300" : "text-slate-400 hover:text-white"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="rounded-lg border border-sky-400/10 bg-sky-400/5 px-4 py-3 text-xs leading-6 text-slate-400">
          DEMO ·
          All metrics are demo data. Hover for details, click legends to filter, and drag the trend slider to zoom. Use the toolbar to inspect data, reset charts, or save images.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            [Globe2, "Total requests", requests, "million"],
            [Zap, "Average latency", avgLatency, "ms"],
            [Server, "Demo nodes", visibleNodes.length, "nodes"],
            [ShieldCheck, "Target availability", "99.99", "%"],
          ].map(([Icon, label, value, unit]) => (
            <section
              key={label}
              className="rounded-2xl border border-white/8 bg-[#101a2e] p-5"
            >
              <div className="flex justify-between text-sm text-slate-400">
                {label}
                <Icon size={18} className="text-sky-400" />
              </div>
              <p className="mt-4 font-mono text-3xl text-white">
                {value}
                <span className="ml-2 text-xs text-slate-500">{unit}</span>
              </p>
              <p className="mt-4 flex items-center gap-1 text-xs text-emerald-400">
                <ArrowUpRight size={14} />
                {periods[range][0]} · {region}
              </p>
            </section>
          ))}
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          <Chart
            wide
            title="Request trends"
            subtitle="Filter legends / Zoom ranges / Switch chart types"
            option={{
              dataset: { source: trend },
              tooltip: { trigger: "axis", confine: true },
              legend: { top: 4, left: 0 },
              grid: { left: 45, right: 15, top: 80, bottom: 68 },
              xAxis: { ...axis, type: "category" },
              yAxis: { ...axis, type: "value", name: "thousands" },
              dataZoom: [
                { type: "inside" },
                { type: "slider", bottom: 4, height: 22 },
              ],
              toolbox: {
                ...common.toolbox,
                feature: {
                  ...common.toolbox.feature,
                  magicType: {
                    type: ["line", "bar"],
                    title: { line: "Switch to line chart", bar: "Switch to bar chart" },
                  },
                },
              },
              series: ["Requests", "Cache hits"].map((name) => ({
                name,
                type: "line",
                smooth: true,
                showSymbol: false,
                areaStyle: { opacity: 0.08 },
                encode: { x: "time", y: name },
              })),
            }}
          />
          <Chart
            title="Traffic by region"
            subtitle="Hover for shares; click legends to toggle regions"
            option={{
              legend: { bottom: 0 },
              series: [
                {
                  type: "pie",
                  radius: ["45%", "67%"],
                  center: ["50%", "45%"],
                  label: { show: false },
                  emphasis: {
                    label: { show: true, fontSize: 18, formatter: "{b}\n{d}%" },
                  },
                  data: (region === "Global"
                    ? [
                        ["Asia Pacific", 48],
                        ["North America", 28],
                        ["Europe", 18],
                        ["Other", 6],
                      ]
                    : [
                        ["Singapore", 45],
                        ["Tokyo", 35],
                        ["Sydney", 20],
                      ]
                  ).map(([name, value]) => ({ name, value })),
                },
              ],
            }}
          />
          <Chart
            wide
            title="Edge connections"
            subtitle="Drag and zoom to explore logical connections, not geographic locations"
            option={{
              series: [
                {
                  type: "graph",
                  layout: "circular",
                  roam: true,
                  draggable: true,
                  label: { show: true, position: "bottom", color: "#cbd5e1" },
                  symbolSize: 42,
                  edgeSymbol: ["none", "arrow"],
                  lineStyle: { color: "source", curveness: 0.2, opacity: 0.5 },
                  emphasis: { focus: "adjacency" },
                  data: visibleNodes.map((node, i) => ({
                    ...node,
                    itemStyle: { color: colors[i % colors.length] },
                  })),
                  links: visibleNodes.map((node, i) => ({
                    source: node.name,
                    target: visibleNodes[(i + 1) % visibleNodes.length].name,
                  })),
                },
              ],
            }}
          />
          <Chart
            title="Node latency"
            subtitle="Milliseconds"
            option={{
              dataset: { source: visibleNodes },
              grid: { left: 105, right: 28, top: 40, bottom: 28 },
              xAxis: { ...axis, type: "value" },
              yAxis: { ...axis, type: "category" },
              series: [
                {
                  type: "bar",
                  barMaxWidth: 16,
                  itemStyle: { borderRadius: [0, 5, 5, 0] },
                  encode: { x: "value", y: "name" },
                  label: { show: true, position: "right" },
                },
              ],
            }}
          />
        </div>
        <footer className="flex flex-wrap justify-between gap-3 text-[10px] tracking-widest text-slate-500">
          <span>ESA Pages · DEMO DATA</span>
          <span>REACT + VITE + APACHE ECHARTS · ESA PAGES</span>
        </footer>
      </main>
    </div>
  );
}
