import { Component, OnInit, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GreenOfficeService } from '../../core/services/green-office.service';
import { CarbonService, CarbonLog } from '../../core/services/carbon.service';
import { ThaiDatePipe } from '../../shared/pipes/thai-date-pipe';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, ThaiDatePipe],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  private greenService = inject(GreenOfficeService);
  private carbonService = inject(CarbonService);
  private platformId = inject(PLATFORM_ID);

  currentDate = new Date();
  greenScore = 0;
  carbonTotal = 0;
  energyUsage = 0;

  activeChartView: 'area' | 'bar' | 'pie' = 'area';
  private carbonLogs: CarbonLog[] = [];
  private chartsRendered = false;

  recentActivities = [
    { text: 'AI สแกนบิลไฟฟ้า ม.ค. 69 สำเร็จ', time: '2 ชม. ที่แล้ว', type: 'emerald-500' },
    { text: 'บันทึกการใช้ปริมาณน้ำประปา', time: '5 ชม. ที่แล้ว', type: 'sky-500' },
    { text: 'เพิ่มผลประเมินหมวดที่ 1 (ใหม่)', time: '1 วันที่แล้ว', type: 'amber-500' },
    { text: 'ระบบคำนวณคาร์บอนฟุตพริ้นท์เสร็จสิ้น', time: '2 วันที่แล้ว', type: 'slate-400' }
  ];

  ngOnInit() {
    this.greenService.getCriteriaList().subscribe(criteria => {
      const totalMax = criteria.reduce((sum, c) => sum + c.maxScore, 0);
      const totalGot = criteria.reduce((sum, c) => sum + (c.currentScore || 0), 0);
      this.greenScore = totalMax > 0 ? Math.round((totalGot / totalMax) * 100) : 0;
    });

    this.carbonService.getLogs().subscribe({
      next: (logs) => {
        if (!logs) return;
        this.carbonLogs = logs;
        this.carbonTotal = logs.reduce((sum, log) => sum + log.emission, 0);
        this.energyUsage = logs
          .filter(l => l.type === 'Electricity')
          .reduce((sum, l) => sum + l.amount, 0);
        // Re-render chart if view already initialized
        if (this.chartsRendered) {
          this.renderCurrentChart();
        }
      },
      error: () => console.error('Could not fetch logs for dashboard')
    });
  }

  ngAfterViewInit() {
    this.chartsRendered = true;
    setTimeout(() => this.renderCurrentChart(), 100);
  }

  switchChart(view: 'area' | 'bar' | 'pie') {
    this.activeChartView = view;
    setTimeout(() => this.renderCurrentChart(), 50);
  }

  private renderCurrentChart() {
    if (!isPlatformBrowser(this.platformId)) return;
    import('apexcharts').then((module) => {
      const ApexCharts = module.default;

      // Destroy existing chart instance before re-rendering
      const el = document.querySelector('#apexMainChart');
      if (el) {
        const existingInstance = (ApexCharts as any).getChartByID?.('main-chart');
        if (existingInstance) existingInstance.destroy();
      }

      if (this.activeChartView === 'area') this.renderAreaChart(ApexCharts);
      else if (this.activeChartView === 'bar') this.renderBarChart(ApexCharts);
      else if (this.activeChartView === 'pie') this.renderPieChart(ApexCharts);
    });
  }

  private renderAreaChart(ApexCharts: any) {
    const options = {
      chart: { id: 'main-chart', type: 'area', height: 320, toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
      series: [{ name: 'Carbon (kgCO2e)', data: [120, 145, 110, 85, 75, 68] }],
      colors: ['#10B981'],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 3 },
      fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0, stops: [0, 90, 100] } },
      grid: { borderColor: '#F1F5F9', strokeDashArray: 5 },
      xaxis: { categories: ['ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.'], axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: '#94A3B8', fontSize: '12px' } } },
      yaxis: { labels: { style: { colors: '#94A3B8', fontSize: '12px' } } },
      tooltip: { theme: 'light', y: { formatter: (val: number) => val + ' kgCO2e' } }
    };
    const chart = new ApexCharts(document.querySelector('#apexMainChart'), options);
    chart.render();
  }

  private renderBarChart(ApexCharts: any) {
    // Aggregate carbon logs by type
    const typeMap: Record<string, number> = {};
    this.carbonLogs.forEach(log => {
      typeMap[log.type] = (typeMap[log.type] || 0) + log.emission;
    });
    const labels = Object.keys(typeMap).length > 0 ? Object.keys(typeMap) : ['ไฟฟ้า', 'น้ำมัน', 'น้ำประปา', 'ก๊าซ'];
    const data = Object.keys(typeMap).length > 0
      ? Object.values(typeMap)
      : [0, 0, 0, 0];

    const options = {
      chart: { id: 'main-chart', type: 'bar', height: 320, toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
      series: [{ name: 'การปล่อย CO2 (kgCO2e)', data }],
      colors: ['#10B981', '#F59E0B', '#3B82F6', '#EF4444', '#8B5CF6'],
      plotOptions: { bar: { borderRadius: 8, columnWidth: '55%', distributed: true } },
      dataLabels: { enabled: true, formatter: (val: number) => val.toFixed(1) + ' kg', style: { fontSize: '11px' } },
      legend: { show: false },
      xaxis: { categories: labels, labels: { style: { colors: '#64748B', fontSize: '12px' } }, axisBorder: { show: false } },
      yaxis: { labels: { style: { colors: '#94A3B8', fontSize: '12px' }, formatter: (val: number) => val.toFixed(0) } },
      grid: { borderColor: '#F1F5F9', strokeDashArray: 5 },
      tooltip: { theme: 'light', y: { formatter: (val: number) => val.toFixed(2) + ' kgCO2e' } }
    };
    const chart = new ApexCharts(document.querySelector('#apexMainChart'), options);
    chart.render();
  }

  private renderPieChart(ApexCharts: any) {
    const typeMap: Record<string, number> = {};
    this.carbonLogs.forEach(log => {
      typeMap[log.type] = (typeMap[log.type] || 0) + log.emission;
    });
    const labels = Object.keys(typeMap).length > 0 ? Object.keys(typeMap) : ['ไฟฟ้า', 'น้ำมัน', 'น้ำประปา', 'ก๊าซ'];
    const series = Object.keys(typeMap).length > 0 ? Object.values(typeMap) : [40, 30, 20, 10];

    const options = {
      chart: { id: 'main-chart', type: 'donut', height: 320, toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
      series,
      labels,
      colors: ['#10B981', '#F59E0B', '#3B82F6', '#EF4444', '#8B5CF6'],
      legend: { position: 'bottom', fontSize: '13px', fontFamily: 'Inter, sans-serif' },
      plotOptions: { pie: { donut: { size: '65%', labels: { show: true, total: { show: true, label: 'CO2 รวม', fontSize: '14px', formatter: () => this.carbonTotal.toFixed(1) + ' kg' } } } } },
      dataLabels: { enabled: true, formatter: (_val: number, opts: any) => opts.w.globals.labels[opts.seriesIndex], style: { fontSize: '11px' } },
      tooltip: { theme: 'light', y: { formatter: (val: number) => val.toFixed(2) + ' kgCO2e' } }
    };
    const chart = new ApexCharts(document.querySelector('#apexMainChart'), options);
    chart.render();
  }

  exportPDF() {
    if (!isPlatformBrowser(this.platformId)) return;
    const element = document.getElementById('dashboard-content');
    if (!element) return;
    html2canvas(element, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`GreenSync_Report_Dashboard.pdf`);
    });
  }
}