package com.inventory.smart_inventory.dashboard.service.impl;

import com.inventory.smart_inventory.dashboard.service.DashboardService;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.Method;
import java.time.LocalDate;
import java.util.List;

@Service
public class DashboardPdfService {

    private final DashboardService dashboardService;

    public DashboardPdfService(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    public byte[] generateDashboardPdf()
    {
        try (PDDocument document = new PDDocument())
        {
            // =====================================================
            // PAGE 1
            // =====================================================

            PDPage page = new PDPage(PDRectangle.A4);
            document.addPage(page);

            PDPageContentStream content = new PDPageContentStream(document, page);
            float y = 790;

            // =========================
            // HEADER
            // =========================

            y = writeText(content, "SMARTSHELFX", 50, y, 24);

            y = writeText(content, "Inventory Dashboard Report", 50, y - 10, 15);

            y = writeText(content, "Generated on: " + LocalDate.now(), 50, y - 15, 9);

            y -= 25;

            // =========================
            // DASHBOARD SUMMARY
            // =========================

            y = writeSectionTitle(content, "Dashboard Summary", 50, y);

            Object summary = dashboardService.getSummary();

            y = writeSummary(content, summary, 50, y - 15);

            y -= 25;

            // =========================
            // MONTHLY SALES
            // =========================

            y = writeSectionTitle(content, "Monthly Sales", 50, y);

            List<?> monthlySales = dashboardService.getMonthlySales();

            y = writeList(content, monthlySales, 50, y - 15);

            y -= 20;

            // =========================
            // MONTHLY PURCHASES
            // =========================

            y = writeSectionTitle(content, "Monthly Purchases", 50, y);

            List<?> monthlyPurchases = dashboardService.getMonthlyPurchases();

            y = writeList(content, monthlyPurchases, 50, y - 15);

            content.close();


            // =====================================================
            // PAGE 2
            // =====================================================

            page = new PDPage(PDRectangle.A4);
            document.addPage(page);

            content = new PDPageContentStream(document, page);

            y = 790;

            // =========================
            // PAGE HEADER
            // =========================

            y = writeText(content, "SMARTSHELFX", 50, y, 18);

            y = writeText(content, "Inventory Analysis", 50, y - 8, 12);

            y -= 25;

            // =========================
            // STOCK BY CATEGORY
            // =========================

            y = writeSectionTitle(content, "Stock Distribution by Category", 50, y);

            List<?> stockByCategory = dashboardService.getStockDistributionByCategory();

            y = writeList(content, stockByCategory, 50, y - 15);

            y -= 20;

            // =========================
            // TOP SELLING PRODUCTS
            // =========================

            y = writeSectionTitle(content, "Top Selling Products", 50, y);

            List<?> topSellingProducts = dashboardService.getTopSellingProducts();

            y = writeList(content, topSellingProducts, 50, y - 15);

            content.close();


            // =====================================================
            // PAGE 3
            // =====================================================

            page = new PDPage(PDRectangle.A4);
            document.addPage(page);

            content = new PDPageContentStream(document, page);

            y = 790;

            // =========================
            // PAGE HEADER
            // =========================

            y = writeText(content, "SMARTSHELFX", 50, y, 18);

            y = writeText(content, "Inventory Recommendations", 50, y - 8, 12);

            y -= 25;

            // =========================
            // RESTOCK RECOMMENDATIONS
            // =========================

            y = writeSectionTitle(content, "Restock Recommendations", 50, y);

            List<?> restock = dashboardService.getRestockRecommendation();

            y = writeList(content, restock, 50, y - 15);

            y -= 20;

            // =========================
            // DEMAND FORECAST
            // =========================

            y = writeSectionTitle(content, "Demand Forecast", 50, y);

            List<?> forecast = dashboardService.getDemandForecast();

            writeList(content, forecast, 50, y - 15);

            content.close();


            // =====================================================
            // SAVE PDF
            // =====================================================

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            document.save(outputStream);
            return outputStream.toByteArray();

        }
        catch (Exception e)
        {
            throw new RuntimeException("Failed to generate dashboard PDF", e);
        }
    }


    // =========================================================
    // WRITE SECTION TITLE
    // =========================================================

    private float writeSectionTitle(PDPageContentStream content,String text, float x, float y
    ) throws IOException
    {
        content.beginText();

        content.setFont(new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD), 13);

        content.newLineAtOffset(x, y);

        content.showText(text);

        content.endText();

        // Separator line

        content.moveTo(x, y - 7);
        content.lineTo(545, y - 7);
        content.stroke();
        return y - 25;
    }


    // =========================================================
    // WRITE TEXT
    // =========================================================

    private float writeText(PDPageContentStream content, String text,
            float x, float y, float fontSize) throws IOException
    {
        content.beginText();

        content.setFont(new PDType1Font(Standard14Fonts.FontName.HELVETICA), fontSize);

        content.newLineAtOffset(x, y);

        content.showText(text);

        content.endText();

        return y;
    }


    // =========================================================
    // WRITE SUMMARY
    // =========================================================

    private float writeSummary(PDPageContentStream content, Object summary,
            float x, float y) throws Exception
    {
        if (summary == null) {
            return y;
        }

        Method[] methods = summary.getClass().getMethods();

        float leftX = x;
        float rightX = 310;

        float leftY = y;
        float rightY = y;

        int count = 0;

        for (Method method : methods)
        {
            if (!method.getName().startsWith("get")) {
                continue;
            }

            if (method.getName().equals("getClass")) {
                continue;
            }

            Object value = method.invoke(summary);

            if (value == null) {
                continue;
            }

            String fieldName = method.getName().substring(3);

            String text = fieldName + ": " + value;

            if (count % 2 == 0)
            {
                leftY = writeText(content, text, leftX, leftY, 10);
                leftY -= 20;
            }
            else
            {
                rightY = writeText(content, text, rightX, rightY, 10);
                rightY -= 20;
            }
            count++;
        }

        return Math.min(leftY, rightY);
    }


    // =========================================================
    // WRITE OBJECT
    // =========================================================

    private float writeObject(PDPageContentStream content, Object object,
            float x, float y) throws Exception
    {
        if (object == null) {
            return y;
        }

        Method[] methods = object.getClass().getMethods();

        for (Method method : methods)
        {
            if (!method.getName().startsWith("get")) {
                continue;
            }

            if (method.getName().equals("getClass")) {
                continue;
            }

            Object value = method.invoke(object);

            if (value == null) {
                continue;
            }

            String fieldName = method.getName().substring(3);

            String text = fieldName + ": " + value;

            y = writeText(content, text, x, y, 10);

            y -= 15;
        }

        return y;
    }


    // =========================================================
    // WRITE LIST
    // =========================================================

    private float writeList(PDPageContentStream content, List<?> list, float x, float y) throws Exception
    {
        if (list == null || list.isEmpty())
        {
            return writeText(content, "No data available.", x, y, 10) - 20;
        }

        for (Object item : list)
        {
            y = writeObject(content, item, x, y);

            y -= 10;

            if (y < 80) {
                break;
            }
        }
        return y;
    }
}