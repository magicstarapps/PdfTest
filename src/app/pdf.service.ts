import { Injectable } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  public async exportToPdf(element: HTMLElement, fileName: string) {
    const doc = new jspdf.jsPDF();
    if (!element) {
      console.error('Element not found!');
      return;
    }
    const canvas = await html2canvas(element);
    console.log(canvas)
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // mm (A4 width)
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    

    doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    doc.addPage('A4');
    doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    doc.addPage('A4');
    doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
   
    
    doc.save(fileName + '.pdf');
  }
}