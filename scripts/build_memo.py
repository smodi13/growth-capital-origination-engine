#!/usr/bin/env python3
"""
SUPERSEDED. The committed workbook and memorandum are supplied files that are
the approved source of truth. Do not run this script over public/downloads:
regenerating would change the bytes the site is verified against.

Build Enterprise Software Origination and Underwriting Case.pdf.

The memorandum is generated from the same model constants that drive the web
application and the Excel workbook, so the three artefacts cannot drift apart.
Charts are drawn with reportlab's graphics primitives; no external assets and
no network access are involved.

Run: python3 scripts/build_memo.py
"""

from __future__ import annotations

import os

from reportlab.lib import colors
from reportlab.lib.enums import TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.graphics.shapes import Drawing, Line, Rect, String
from reportlab.graphics.charts.barcharts import VerticalBarChart
from reportlab.graphics.charts.linecharts import HorizontalLineChart

OUT = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "public",
    "downloads",
    "Enterprise Software Origination and Underwriting Case.pdf",
)

COMPANY = "Northstar Workflow Systems"
HYPO_SHORT = (
    f"{COMPANY} is a hypothetical company created solely for an illustrative "
    "underwriting exercise. It is not a real business or investment opportunity."
)
HYPO_LONG = (
    f"{COMPANY} is hypothetical. All operating, financial, and transaction "
    "assumptions are illustrative and do not represent an actual company or "
    "investment recommendation."
)
PROJECT_DISCLOSURE = (
    "This is an independent work sample built by Sahil Modi. It is not affiliated with or "
    "endorsed by any investment firm. The private-company universe is based on dated public "
    "sources. Missing information is identified as not publicly disclosed. The underwriting "
    "case is hypothetical and illustrative and does not represent an actual company or "
    "investment recommendation."
)

# ---------------------------------------------------------------------------
# Model figures, mirroring src/data/hypothetical.ts
# ---------------------------------------------------------------------------

YEARS = [1, 2, 3, 4, 5]
BEG_ARR = [12.000, 15.600, 19.968, 25.160, 31.198]
NEW_ARR = [2.400, 2.808, 3.195, 3.522, 3.744]
EXP_ARR = [2.640, 3.432, 4.393, 5.535, 6.864]
CHN_ARR = [1.440, 1.872, 2.396, 3.019, 3.744]
END_ARR = [15.600, 19.968, 25.160, 31.198, 38.062]
GROWTH = [0.30, 0.28, 0.26, 0.24, 0.22]
REVENUE = [13.800, 17.784, 22.564, 28.179, 34.630]
GROSS_PROFIT = [10.764, 13.872, 17.600, 21.979, 27.011]
EBITDA = [-3.450, -3.201, -2.482, -1.127, 1.039]
FCF = [-3.366, -3.120, -2.414, -1.087, 1.033]
CAC = [23.2, 22.8, 22.0, 21.1, 20.1]
BURN = ["0.94x", "0.71x", "0.47x", "0.18x", "n/a"]
RULE40 = [5, 10, 15, 20, 25]
CUSTOMERS = [253, 262, 267, 268, 263]
ACV = [61.7, 76.2, 94.2, 116.6, 144.5]

CASH_EQ = [21.634, 18.514, 16.100, 15.013, 16.046]
CASH_PC = [18.934, 13.514, 8.800, 4.413, 2.261]
CASH_BL = [20.134, 15.694, 11.960, 8.953, 8.132]

DSCR_PC = [-1.62, -1.55, -1.28, -0.51, 0.11]
DSCR_BL = [-2.82, -2.70, -2.22, -0.88, 0.19]

MIN_CASH = 5.0

DOWNSIDE = {"Growth equity": 8.36, "Private credit": -5.43, "Blended capital": 0.44}

STRUCT = {
    "equity": dict(
        label="Growth equity", equity=20.0, debt=0.0, pre=96.0, post=116.0,
        own=0.1724, dil=0.1724, cash_close=25.0, end_cash=16.046, end_debt=0.0,
        ev=266.4, eq_value=282.5, proceeds=48.7, moic=2.44, irr=0.195,
        debt_moic=None, debt_irr=None, breach=None, low_cash=15.013,
    ),
    "credit": dict(
        label="Private credit", equity=0.0, debt=20.0, pre=96.0, post=96.0,
        own=0.0, dil=0.0, cash_close=24.6, end_cash=2.261, end_debt=18.0,
        ev=266.4, eq_value=250.7, proceeds=0.0, moic=None, irr=None,
        debt_moic=1.60, debt_irr=0.121, breach=4, low_cash=2.261,
    ),
    "blended": dict(
        label="Blended capital", equity=8.0, debt=12.0, pre=96.0, post=104.0,
        own=0.0769, dil=0.0769, cash_close=24.82, end_cash=8.132, end_debt=10.8,
        ev=266.4, eq_value=263.8, proceeds=20.3, moic=2.54, irr=0.205,
        debt_moic=1.57, debt_irr=0.114, breach=None, low_cash=8.132,
    ),
}

# ---------------------------------------------------------------------------
# Palette and styles
# ---------------------------------------------------------------------------

INK = colors.HexColor("#12181F")
INK_MID = colors.HexColor("#4A5766")
INK_LIGHT = colors.HexColor("#8592A3")
RULE = colors.HexColor("#D4DBE3")
BAND = colors.HexColor("#F1F5F8")
ACCENT = colors.HexColor("#0F5F66")
ACCENT_LIGHT = colors.HexColor("#2AA1A9")
WARN = colors.HexColor("#9B1C1C")
WARN_BG = colors.HexColor("#FBEAEA")
GOOD = colors.HexColor("#1D7A5F")

ss = getSampleStyleSheet()


def S(name, **kw):
    base = dict(fontName="Helvetica", fontSize=8.6, leading=12.2, textColor=INK,
                spaceBefore=0, spaceAfter=0, alignment=TA_JUSTIFY)
    base.update(kw)
    return ParagraphStyle(name, **base)


st_title = S("t", fontName="Helvetica-Bold", fontSize=19, leading=22, textColor=INK, alignment=TA_LEFT)
st_sub = S("s", fontSize=9.6, leading=13, textColor=INK_MID, alignment=TA_LEFT)
st_h1 = S("h1", fontName="Helvetica-Bold", fontSize=11.2, leading=14, textColor=ACCENT,
          spaceBefore=9, spaceAfter=3.5, alignment=TA_LEFT)
st_h2 = S("h2", fontName="Helvetica-Bold", fontSize=9.2, leading=12, textColor=INK,
          spaceBefore=5, spaceAfter=2, alignment=TA_LEFT)
st_body = S("b", spaceAfter=4.5)
st_small = S("sm", fontSize=7.4, leading=10, textColor=INK_MID)
st_note = S("n", fontSize=7.2, leading=9.6, textColor=INK_LIGHT, fontName="Helvetica-Oblique")
st_cell = S("c", fontSize=7.6, leading=9.6, alignment=TA_LEFT)
st_cellr = S("cr", fontSize=7.6, leading=9.6, alignment=2)
st_head = S("hd", fontName="Helvetica-Bold", fontSize=7.2, leading=9, textColor=colors.white, alignment=TA_LEFT)
st_headr = S("hdr", fontName="Helvetica-Bold", fontSize=7.2, leading=9, textColor=colors.white, alignment=2)
st_bullet = S("bu", fontSize=8.4, leading=11.6, leftIndent=9, bulletIndent=1.5, spaceAfter=2.5)
st_disc = S("d", fontSize=7.6, leading=10.4, textColor=WARN, fontName="Helvetica-Bold")

PAGE_W, PAGE_H = A4
MARGIN = 15 * mm
CONTENT_W = PAGE_W - 2 * MARGIN

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def money(v, dp=1):
    return f"({abs(v):,.{dp}f})" if v < 0 else f"{v:,.{dp}f}"


def pct(v, dp=1):
    return f"{v * 100:.{dp}f}%"


def table(data, widths, align_right_from=1, header=True, band=True, extra=None):
    rows = []
    for ri, row in enumerate(data):
        out = []
        for ci, cell in enumerate(row):
            if ri == 0 and header:
                stl = st_headr if ci >= align_right_from else st_head
            else:
                stl = st_cellr if ci >= align_right_from else st_cell
            out.append(Paragraph(str(cell), stl))
        rows.append(out)

    t = Table(rows, colWidths=widths, hAlign="LEFT", repeatRows=1 if header else 0)
    style = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 2.6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.6),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("LINEBELOW", (0, 0), (-1, -1), 0.4, RULE),
    ]
    if header:
        style += [
            ("BACKGROUND", (0, 0), (-1, 0), INK),
            ("LINEBELOW", (0, 0), (-1, 0), 0.8, INK),
        ]
    if band:
        start = 1 if header else 0
        for i in range(start, len(rows)):
            if (i - start) % 2 == 1:
                style.append(("BACKGROUND", (0, i), (-1, i), BAND))
    if extra:
        style += extra
    t.setStyle(TableStyle(style))
    return t


def rule(color=RULE, w=0.8, space=3):
    d = Drawing(CONTENT_W, w + space)
    d.add(Line(0, space, CONTENT_W, space, strokeColor=color, strokeWidth=w))
    return d


def callout(title, body, tone="accent"):
    bg = WARN_BG if tone == "warn" else colors.HexColor("#EAF4F5")
    fg = WARN if tone == "warn" else ACCENT
    inner = [
        Paragraph(f"<b>{title}</b>", S("ct", fontName="Helvetica-Bold", fontSize=8.4,
                                       leading=11, textColor=fg, alignment=TA_LEFT)),
        Spacer(1, 2),
        Paragraph(body, S("cb", fontSize=8, leading=11, textColor=INK)),
    ]
    t = Table([[inner]], colWidths=[CONTENT_W], hAlign="LEFT")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LINEBEFORE", (0, 0), (0, -1), 2.2, fg),
    ]))
    return t


def disclosure_bar(text=HYPO_SHORT):
    t = Table([[Paragraph(text, st_disc)]], colWidths=[CONTENT_W], hAlign="LEFT")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), WARN_BG),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4.5),
        ("BOX", (0, 0), (-1, -1), 0.6, WARN),
    ]))
    return t


def chart_caption(text):
    return Paragraph(text, st_note)


# ---------------------------------------------------------------------------
# Charts
# ---------------------------------------------------------------------------


def chart_arr(width, height):
    """The ARR bridge flows.

    Only the flows are plotted. Including the beginning balance would dominate
    the scale and hide the three quantities that actually matter, and the
    balances are already in the table above.
    """
    d = Drawing(width, height)
    bc = VerticalBarChart()
    bc.x = 26
    bc.y = 22
    bc.width = width - 40
    bc.height = height - 42
    bc.data = [NEW_ARR, EXP_ARR, [-c for c in CHN_ARR]]
    bc.categoryAxis.categoryNames = [f"Y{y}" for y in YEARS]
    bc.categoryAxis.labels.fontSize = 6.6
    bc.categoryAxis.labels.fontName = "Helvetica"
    bc.valueAxis.valueMin = -5
    bc.valueAxis.valueMax = 8
    bc.valueAxis.valueStep = 2
    bc.valueAxis.labels.fontSize = 6.6
    bc.valueAxis.labels.fontName = "Helvetica"
    bc.groupSpacing = 12
    bc.barSpacing = 1
    bc.bars[0].fillColor = ACCENT
    bc.bars[1].fillColor = ACCENT_LIGHT
    bc.bars[2].fillColor = colors.HexColor("#C2534E")
    # Setting the attribute on the collection applies it to every series.
    # Iterating bc.bars is an unbounded generator in reportlab, so never do that.
    bc.bars.strokeWidth = 0
    d.add(bc)

    d.add(String(0, height - 9, "ARR bridge flows, USD millions",
                 fontName="Helvetica-Bold", fontSize=7.4, fillColor=INK))
    legend = [("New ARR", ACCENT), ("Expansion ARR", ACCENT_LIGHT),
              ("Churned ARR", colors.HexColor("#C2534E"))]
    x = 0
    for label, col in legend:
        d.add(Rect(x, 2, 6, 6, fillColor=col, strokeColor=None))
        d.add(String(x + 8, 3, label, fontName="Helvetica", fontSize=6.2, fillColor=INK_MID))
        x += 8 + len(label) * 3.4 + 10
    return d


def chart_arr_trajectory(width, height):
    """Ending ARR trajectory against EBITDA, showing the crossover."""
    d = Drawing(width, height)
    bc = VerticalBarChart()
    bc.x = 26
    bc.y = 22
    bc.width = width - 40
    bc.height = height - 42
    bc.data = [END_ARR, EBITDA]
    bc.categoryAxis.categoryNames = [f"Y{y}" for y in YEARS]
    bc.categoryAxis.labels.fontSize = 6.6
    bc.valueAxis.valueMin = -10
    bc.valueAxis.valueMax = 40
    bc.valueAxis.valueStep = 10
    bc.valueAxis.labels.fontSize = 6.6
    bc.groupSpacing = 12
    bc.barSpacing = 1
    bc.bars[0].fillColor = colors.HexColor("#1A2230")
    bc.bars[1].fillColor = colors.HexColor("#C2534E")
    bc.bars.strokeWidth = 0
    d.add(bc)
    d.add(String(0, height - 9, "Ending ARR and EBITDA, USD millions",
                 fontName="Helvetica-Bold", fontSize=7.4, fillColor=INK))
    legend = [("Ending ARR", colors.HexColor("#1A2230")), ("EBITDA", colors.HexColor("#C2534E"))]
    x = 0
    for label, col in legend:
        d.add(Rect(x, 2, 6, 6, fillColor=col, strokeColor=None))
        d.add(String(x + 8, 3, label, fontName="Helvetica", fontSize=6.2, fillColor=INK_MID))
        x += 8 + len(label) * 3.4 + 10
    return d


def chart_cash(width, height):
    """Cash runway under the three structures against the minimum cash covenant."""
    d = Drawing(width, height)
    lc = HorizontalLineChart()
    lc.x = 30
    lc.y = 26
    lc.width = width - 46
    lc.height = height - 46
    lc.data = [CASH_EQ, CASH_PC, CASH_BL, [MIN_CASH] * 5]
    lc.categoryAxis.categoryNames = [f"Y{y}" for y in YEARS]
    lc.categoryAxis.joinAxisMode = "bottom"
    lc.categoryAxis.labels.fontSize = 6.6
    lc.valueAxis.valueMin = 0
    lc.valueAxis.valueMax = 25
    lc.valueAxis.valueStep = 5
    lc.valueAxis.labels.fontSize = 6.6
    lc.lines[0].strokeColor = colors.HexColor("#1A2230")
    lc.lines[0].strokeWidth = 1.6
    lc.lines[1].strokeColor = WARN
    lc.lines[1].strokeWidth = 1.6
    lc.lines[2].strokeColor = ACCENT
    lc.lines[2].strokeWidth = 2.2
    lc.lines[3].strokeColor = INK_LIGHT
    lc.lines[3].strokeWidth = 0.9
    lc.lines[3].strokeDashArray = (2, 2)
    d.add(lc)

    d.add(String(0, height - 9, "Cash balance by structure, USD millions",
                 fontName="Helvetica-Bold", fontSize=7.4, fillColor=INK))
    legend = [("Growth equity", colors.HexColor("#1A2230")), ("Private credit", WARN),
              ("Blended", ACCENT), ("Minimum cash", INK_LIGHT)]
    x = 0
    for label, col in legend:
        d.add(Rect(x, 2, 6, 6, fillColor=col, strokeColor=None))
        d.add(String(x + 8, 3, label, fontName="Helvetica", fontSize=6.2, fillColor=INK_MID))
        x += 8 + len(label) * 3.2 + 10
    return d


def chart_dilution(width, height):
    """Founder dilution against equity investor MOIC."""
    d = Drawing(width, height)
    bc = VerticalBarChart()
    bc.x = 30
    bc.y = 22
    bc.width = width - 46
    bc.height = height - 42
    bc.data = [[17.2, 0.0, 7.7]]
    bc.categoryAxis.categoryNames = ["Growth\nequity", "Private\ncredit", "Blended\ncapital"]
    bc.categoryAxis.labels.fontSize = 6.4
    bc.valueAxis.valueMin = 0
    bc.valueAxis.valueMax = 20
    bc.valueAxis.valueStep = 5
    bc.valueAxis.labels.fontSize = 6.6
    bc.bars[0].fillColor = ACCENT
    bc.bars[0].strokeWidth = 0
    bc.barWidth = 12
    bc.groupSpacing = 22
    d.add(bc)
    d.add(String(0, height - 9, "Founder dilution, percent",
                 fontName="Helvetica-Bold", fontSize=7.4, fillColor=INK))
    return d


def chart_downside(width, height):
    """Year five cash under the downside case."""
    d = Drawing(width, height)
    bc = VerticalBarChart()
    bc.x = 30
    bc.y = 22
    bc.width = width - 46
    bc.height = height - 42
    vals = [DOWNSIDE["Growth equity"], DOWNSIDE["Private credit"], DOWNSIDE["Blended capital"]]
    bc.data = [vals]
    bc.categoryAxis.categoryNames = ["Growth\nequity", "Private\ncredit", "Blended\ncapital"]
    bc.categoryAxis.labels.fontSize = 6.4
    bc.valueAxis.valueMin = -8
    bc.valueAxis.valueMax = 10
    bc.valueAxis.valueStep = 4
    bc.valueAxis.labels.fontSize = 6.6
    bc.bars[0].strokeWidth = 0
    bc.bars[(0, 0)].fillColor = colors.HexColor("#1A2230")
    bc.bars[(0, 1)].fillColor = WARN
    bc.bars[(0, 2)].fillColor = ACCENT
    bc.barWidth = 12
    bc.groupSpacing = 22
    d.add(bc)
    d.add(String(0, height - 9, "Downside case: year five cash, USD millions",
                 fontName="Helvetica-Bold", fontSize=7.4, fillColor=INK))
    return d


def chart_dscr(width, height):
    """Debt service coverage under each debt structure."""
    d = Drawing(width, height)
    lc = HorizontalLineChart()
    lc.x = 30
    lc.y = 26
    lc.width = width - 46
    lc.height = height - 46
    lc.data = [DSCR_PC, DSCR_BL, [1.0] * 5]
    lc.categoryAxis.categoryNames = [f"Y{y}" for y in YEARS]
    lc.categoryAxis.joinAxisMode = "bottom"
    lc.categoryAxis.labels.fontSize = 6.6
    lc.valueAxis.valueMin = -3
    lc.valueAxis.valueMax = 2
    lc.valueAxis.valueStep = 1
    lc.valueAxis.labels.fontSize = 6.6
    lc.lines[0].strokeColor = WARN
    lc.lines[0].strokeWidth = 1.6
    lc.lines[1].strokeColor = ACCENT
    lc.lines[1].strokeWidth = 1.6
    lc.lines[2].strokeColor = INK_LIGHT
    lc.lines[2].strokeWidth = 0.9
    lc.lines[2].strokeDashArray = (2, 2)
    d.add(lc)
    d.add(String(0, height - 9, "Debt service coverage ratio, times",
                 fontName="Helvetica-Bold", fontSize=7.4, fillColor=INK))
    legend = [("USD 20m facility", WARN), ("USD 12m facility", ACCENT), ("1.0x", INK_LIGHT)]
    x = 0
    for label, col in legend:
        d.add(Rect(x, 2, 6, 6, fillColor=col, strokeColor=None))
        d.add(String(x + 8, 3, label, fontName="Helvetica", fontSize=6.2, fillColor=INK_MID))
        x += 8 + len(label) * 3.2 + 10
    return d


GAP = 6 * mm
HALF_W = (CONTENT_W - GAP) / 2


def side_by_side(a, b):
    """Two columns with a dedicated spacer column.

    The gap is its own column rather than cell padding, so the usable width of
    each content column is exactly HALF_W. Passing a Drawing wider than its cell
    makes reportlab loop during layout rather than fail, so the widths have to
    line up exactly.
    """
    t = Table([[a, "", b]], colWidths=[HALF_W, GAP, HALF_W], hAlign="LEFT")
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return t


# ---------------------------------------------------------------------------
# Page furniture
# ---------------------------------------------------------------------------


def page_decor(canvas, doc):
    canvas.saveState()
    # Header rule and running title on pages after the first.
    if doc.page > 1:
        canvas.setStrokeColor(RULE)
        canvas.setLineWidth(0.6)
        canvas.line(MARGIN, PAGE_H - 12 * mm, PAGE_W - MARGIN, PAGE_H - 12 * mm)
        canvas.setFont("Helvetica", 7)
        canvas.setFillColor(INK_LIGHT)
        canvas.drawString(MARGIN, PAGE_H - 10.4 * mm,
                          "Enterprise Software Origination and Underwriting Case")
        canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - 10.4 * mm, COMPANY + " (hypothetical)")

    # Footer.
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.6)
    canvas.line(MARGIN, 14 * mm, PAGE_W - MARGIN, 14 * mm)
    canvas.setFont("Helvetica-Oblique", 6.6)
    canvas.setFillColor(INK_LIGHT)
    canvas.drawString(MARGIN, 10.4 * mm, "All figures are hypothetical and illustrative.")
    canvas.drawCentredString(PAGE_W / 2, 10.4 * mm, "Sahil Modi  |  modi.sahil@gmail.com")
    canvas.drawRightString(PAGE_W - MARGIN, 10.4 * mm, f"Page {doc.page}")
    canvas.restoreState()


doc = BaseDocTemplate(
    OUT,
    pagesize=A4,
    leftMargin=MARGIN,
    rightMargin=MARGIN,
    topMargin=17 * mm,
    bottomMargin=18 * mm,
    title="Enterprise Software Origination and Underwriting Case",
    author="Sahil Modi",
    subject=f"Illustrative growth capital underwriting of {COMPANY}, a hypothetical company",
    creator="Growth Capital Origination Engine",
)
frame = Frame(MARGIN, 18 * mm, CONTENT_W, PAGE_H - 17 * mm - 18 * mm, id="body",
              leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
from reportlab.platypus import PageTemplate  # noqa: E402

doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=page_decor)])

# ---------------------------------------------------------------------------
# Content
# ---------------------------------------------------------------------------

E = []
W = CONTENT_W

# ============================================================ Page 1: cover ==
E.append(Paragraph("Enterprise Software Origination and Underwriting Case", st_title))
E.append(Spacer(1, 3))
E.append(Paragraph(
    "An illustrative growth capital underwriting of a hypothetical B2B enterprise SaaS company, "
    "comparing growth equity, private credit, and blended capital against the same requirement.",
    st_sub))
E.append(Spacer(1, 5))
E.append(rule(INK, 1.2))
E.append(Spacer(1, 5))
E.append(disclosure_bar())
E.append(Spacer(1, 8))

# --- Executive summary
E.append(Paragraph("1. Executive Summary", st_h1))
E.append(Paragraph(
    f"{COMPANY} is a hypothetical B2B enterprise SaaS business with USD 12.0 million of beginning "
    "annual recurring revenue growing 30 percent, net revenue retention of 110 percent, gross retention "
    "of 88 percent, gross margin of 78 percent, and negative EBITDA. It requires approximately USD 20 "
    "million of growth capital to fund product development, enterprise sales hiring, international "
    "expansion, working capital, selective acquisitions, and the refinancing of USD 3.0 million of "
    "existing term debt.",
    st_body))
E.append(Paragraph(
    "The question this memorandum addresses is not whether the company should raise capital, but which "
    "structure it should raise. The operating forecast is held identical across all three alternatives, "
    "so every difference in outcome below is attributable to the structure rather than to the business.",
    st_body))
E.append(Paragraph(
    "<b>Recommendation: a blended structure of USD 8 million of primary equity alongside a USD 12 "
    "million senior secured facility.</b> It dilutes existing holders by 7.7 percent rather than 17.2 "
    "percent, never breaches the minimum cash covenant, delivers a higher equity investor MOIC of 2.54x "
    "against 2.44x, and leaves USD 8.1 million of cash at the end of year five. The all debt structure "
    "is rejected on arithmetic rather than preference: the company cannot service USD 20 million of "
    "principal from operating cash flow, and it breaches the covenant in year four.",
    st_body))

summary = [
    ["Metric", "Growth equity", "Private credit", "Blended capital"],
    ["Equity invested", "USD 20.0m", "None", "USD 8.0m"],
    ["Debt principal", "None", "USD 20.0m", "USD 12.0m"],
    ["Founder dilution", "17.2%", "None", "<b>7.7%</b>"],
    ["Lowest cash balance", "USD 15.0m", "USD 2.3m", "USD 8.1m"],
    ["Minimum cash covenant breach", "None", "<b>Year 4</b>", "None"],
    ["Year 5 ending cash", "USD 16.0m", "USD 2.3m", "USD 8.1m"],
    ["Year 5 ending debt", "None", "USD 18.0m", "USD 10.8m"],
    ["Equity investor MOIC", "2.44x", "n/a", "<b>2.54x</b>"],
    ["Equity investor IRR", "19.5%", "n/a", "<b>20.5%</b>"],
    ["Debt investor IRR", "n/a", "12.1%", "11.4%"],
    ["Downside case year 5 cash", "USD 8.4m", "<b>USD (5.4)m</b>", "USD 0.4m"],
    ["Survives the downside case", "Yes", "<b>No</b>", "Yes, narrowly"],
]
E.append(table(summary, [W * 0.34, W * 0.22, W * 0.22, W * 0.22],
               extra=[("BACKGROUND", (3, 1), (3, -1), colors.HexColor("#DCEDEF")),
                      ("LINEBEFORE", (3, 0), (3, -1), 1.0, ACCENT),
                      ("LINEAFTER", (3, 0), (3, -1), 1.0, ACCENT)]))
E.append(Spacer(1, 3))
E.append(chart_caption("USD millions unless stated. Figures in parentheses are negative. "
                       "The blended capital column is shaded because it is the recommended structure."))

# ============================================ Page 2: company, market, SaaS ==
E.append(Paragraph("2. Company Overview", st_h1))
E.append(Paragraph(
    f"{COMPANY} sells workflow orchestration software to mid market and enterprise operations teams on "
    "annual subscriptions, with a land and expand motion and a modest professional services practice "
    "around implementation. It has approximately 240 customers at an average contract value of roughly "
    "USD 50,000, and is at the scale where a growth financing decision becomes unavoidable: large enough "
    "that the recurring base is financeable, small enough that a single structure choice materially "
    "changes ownership five years out.",
    st_body))

overview = [
    ["Assumption", "Value", "Assumption", "Value"],
    ["Beginning ARR", "USD 12.0m", "Beginning cash", "USD 8.0m"],
    ["Year 1 ARR growth", "30%", "Existing debt", "USD 3.0m"],
    ["Annual growth decay", "2 pts", "Customer count", "240"],
    ["Net revenue retention", "110%", "Entry ARR multiple", "8.0x"],
    ["Gross retention", "88%", "Exit ARR multiple", "7.0x"],
    ["Gross margin", "78%", "Minimum cash covenant", "USD 5.0m"],
]
E.append(table(overview, [W * 0.26, W * 0.22, W * 0.30, W * 0.22], align_right_from=1))
E.append(Spacer(1, 5))

E.append(Paragraph("3. Market and Product", st_h1))
E.append(Paragraph(
    "The category is enterprise workflow orchestration: software that connects systems of record and "
    "automates the approval and handoff steps between them. Demand is driven by the growth of the "
    "software estate rather than by discretionary budget expansion, which makes the spend more durable "
    "than most operational tooling. The competitive risk is the familiar one in this category, that the "
    "large application vendors bundle equivalent capability into products the customer already owns, "
    "which caps pricing power even where the product is technically superior.",
    st_body))
E.append(Paragraph(
    "For underwriting purposes the market matters less than the shape of the revenue. Workflow "
    "orchestration embeds into daily operating process and is expensive to remove once in production. "
    "That supports the retention assumptions and, in turn, supports a lender's willingness to advance "
    "against the recurring base.",
    st_body))

E.append(Paragraph("4. SaaS Quality", st_h1))
E.append(Paragraph(
    "The case is a genuine mix rather than a uniformly strong one, and the weaknesses matter more to "
    "the structure decision than the strengths.",
    st_body))

saas = [
    ["Metric", "Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
    ["ARR growth", "30%", "28%", "26%", "24%", "22%"],
    ["Net revenue retention", "110%", "110%", "110%", "110%", "110%"],
    ["Gross retention", "88%", "88%", "88%", "88%", "88%"],
    ["Gross margin", "78%", "78%", "78%", "78%", "78%"],
    ["CAC payback (months)", "23.2", "22.8", "22.0", "21.1", "20.1"],
    ["Burn multiple", "0.94x", "0.71x", "0.47x", "0.18x", "n/a"],
    ["Rule of 40", "5", "10", "15", "20", "25"],
    ["Customer count", "253", "262", "267", "268", "263"],
    ["Average contract value (USD k)", "61.7", "76.2", "94.2", "116.6", "144.5"],
    ["EBITDA (USD m)", "(3.5)", "(3.2)", "(2.5)", "(1.1)", "1.0"],
]
E.append(table(saas, [W * 0.30] + [W * 0.14] * 5))
E.append(Spacer(1, 4))

E.append(side_by_side(
    [
        Paragraph("What supports the case", st_h2),
        Paragraph("Net revenue retention of 110 percent against gross retention of 88 percent means the "
                  "installed base grows without new logos. The burn multiple improves every year, from "
                  "0.94x to 0.18x, so each dollar of capital buys progressively more ARR. CAC payback "
                  "falls steadily and stays inside two years.", st_body),
    ],
    [
        Paragraph("What constrains it", st_h2),
        Paragraph("Rule of 40 starts at 5 and reaches only 25 by year five, which is the central weakness "
                  "of the credit story. Gross retention of 88 percent implies 12 percent of the base is "
                  "lost annually, so growth depends on continuously replacing churn. Customer count peaks "
                  "in year four and then falls as the mix shifts upmarket.", st_body),
    ],
))
E.append(Spacer(1, 4))
E.append(side_by_side(chart_arr(HALF_W, 42 * mm), chart_arr_trajectory(HALF_W, 42 * mm)))
E.append(Spacer(1, 2))
E.append(chart_caption("Left: the ARR bridge is built from the retention assumptions. Churn and expansion "
                       "are set by gross and net retention; new ARR is the residual required to reach the "
                       "growth target, which makes the sales requirement explicit rather than assumed. "
                       "Right: ARR compounds while EBITDA crosses into positive territory in year five."))

# ================================================= Page 3: capital and cases ==
E.append(Paragraph("5. Capital Need", st_h1))
E.append(Paragraph(
    "The company requires approximately USD 20 million. Cumulative unlevered free cash burn across the "
    "five year forecast is USD 9.0 million, so the raise is not a survival requirement; it funds an "
    "acceleration and refinances USD 3.0 million of existing term debt at close. Uses of proceeds are "
    "held identical across all three structures, which is what makes them comparable.",
    st_body))

uses = [
    ["Use of proceeds", "Rationale"],
    ["Product development", "Orchestration and reporting modules, funding the roadmap that supports expansion pricing"],
    ["Enterprise sales hiring", "Moving upmarket from the mid market base, which drives the rise in average contract value"],
    ["International expansion", "United Kingdom and Germany entry, carrying entity and payroll cost ahead of revenue"],
    ["Working capital", "Supporting lengthening enterprise payment terms as the customer mix shifts"],
    ["Selective acquisitions", "Adjacent connector or template capability, funded from the equity component"],
    ["Refinancing existing debt", "USD 3.0 million of existing term debt repaid in full at close in every structure"],
]
E.append(table(uses, [W * 0.26, W * 0.74], align_right_from=99))
E.append(Spacer(1, 5))

E.append(Paragraph("6. Structure Alternatives", st_h1))
E.append(Paragraph(
    "Three structures raise the same USD 20 million. The entry valuation is 8.0x beginning ARR, giving a "
    "USD 96.0 million pre-money in every case.",
    st_body))
E.append(side_by_side(chart_cash(HALF_W, 44 * mm), chart_dscr(HALF_W, 44 * mm)))
E.append(Spacer(1, 2))
E.append(chart_caption("Left: cash balance under each structure against the USD 5.0 million minimum cash "
                       "covenant. Right: debt service coverage under the two levered structures against "
                       "1.0x. Neither facility reaches 1.0x inside the forecast, but the smaller one never "
                       "puts the covenant at risk."))
E.append(Spacer(1, 5))

E.append(Paragraph("7. Growth Equity Case", st_h1))
E.append(Paragraph(
    "USD 20.0 million of primary equity at a USD 96.0 million pre-money, giving a USD 116.0 million "
    "post-money and 17.2 percent investor ownership. There is no leverage, no covenant, and no debt "
    "service. Cash never falls below USD 15.0 million and the structure survives the downside case "
    "comfortably with USD 8.4 million remaining.",
    st_body))
E.append(Paragraph(
    "At a 7.0x exit ARR multiple on year five ARR of USD 38.1 million, exit equity value is USD 282.5 "
    "million, giving the investor USD 48.7 million, a 2.44x MOIC and a 19.5 percent IRR. This is the "
    "safest structure and the most expensive one. Existing holders give up 17.2 percent of the company "
    "to buy protection they may not need in the base case.",
    st_body))

E.append(Paragraph("8. Private Credit Case", st_h1))
E.append(Paragraph(
    "USD 20.0 million senior secured at 11.5 percent cash interest, five year maturity, three years "
    "interest only, then 5 percent of original principal amortising annually, with a 2.0 percent "
    "original issue discount and no PIK in the base case. There is no dilution at all, which is the "
    "entire attraction, and the structure does not work.",
    st_body))

credit = [
    ["Line item", "Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
    ["Opening balance", "20.0", "20.0", "20.0", "20.0", "19.0"],
    ["Cash interest", "2.30", "2.30", "2.30", "2.30", "2.19"],
    ["Amortisation", "0.00", "0.00", "0.00", "1.00", "1.00"],
    ["Debt service", "2.30", "2.30", "2.30", "3.30", "3.19"],
    ["Closing balance", "20.0", "20.0", "20.0", "19.0", "18.0"],
    ["Debt to ending ARR", "1.28x", "1.00x", "0.79x", "0.61x", "0.47x"],
    ["Interest coverage", "(1.50x)", "(1.39x)", "(1.08x)", "(0.49x)", "0.48x"],
    ["Debt service coverage", "(1.62x)", "(1.55x)", "(1.28x)", "(0.51x)", "0.11x"],
    ["Closing cash", "18.9", "13.5", "8.8", "<b>4.4</b>", "<b>2.3</b>"],
]
E.append(table(credit, [W * 0.30] + [W * 0.14] * 5,
               extra=[("TEXTCOLOR", (4, 9), (5, 9), WARN)]))
E.append(Spacer(1, 3))
E.append(callout(
    "Why the all debt structure is rejected",
    "Interest coverage is negative in every year until year five, because EBITDA is negative. Debt "
    "service coverage never approaches 1.0x. Cash falls to USD 4.4 million in year four, breaching the "
    "USD 5.0 million minimum cash covenant, and ends year five at USD 2.3 million against an outstanding "
    "balance of USD 18.0 million, so refinancing risk at maturity is material rather than theoretical. "
    "In the downside case the company runs out of cash entirely. The lender return is adequate at a "
    "1.60x MOIC and a 12.1 percent IRR, which is precisely the problem: the instrument works for the "
    "lender and not for the borrower.",
    tone="warn"))

# ============================================ Page 4: blended, risks, rec ====
E.append(Paragraph("9. Blended Capital Case", st_h1))
E.append(Paragraph(
    "USD 8.0 million of primary equity alongside a USD 12.0 million senior secured facility at 11.0 "
    "percent cash interest, three years interest only, then 5 percent of original principal amortising "
    "annually, with a 1.5 percent original issue discount. The smaller facility prices marginally "
    "tighter because leverage against the recurring base is lower.",
    st_body))

blended = [
    ["Line item", "Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
    ["Opening balance", "12.0", "12.0", "12.0", "12.0", "11.4"],
    ["Cash interest", "1.32", "1.32", "1.32", "1.32", "1.25"],
    ["Amortisation", "0.00", "0.00", "0.00", "0.60", "0.60"],
    ["Debt service", "1.32", "1.32", "1.32", "1.92", "1.85"],
    ["Closing balance", "12.0", "12.0", "12.0", "11.4", "10.8"],
    ["Debt to ending ARR", "0.77x", "0.60x", "0.48x", "0.37x", "0.28x"],
    ["Closing cash", "20.1", "15.7", "12.0", "9.0", "8.1"],
    ["Covenant headroom", "15.1", "10.7", "7.0", "4.0", "3.1"],
]
E.append(table(blended, [W * 0.30] + [W * 0.14] * 5))
E.append(Spacer(1, 4))

E.append(side_by_side(chart_dilution(HALF_W, 40 * mm), chart_downside(HALF_W, 40 * mm)))
E.append(Spacer(1, 2))
E.append(chart_caption("Left: founder and existing holder dilution by structure. Right: year five cash "
                       "under the downside case, where the all debt structure fails outright."))
E.append(Spacer(1, 4))

E.append(Paragraph(
    "Total cash interest over five years is USD 6.5 million. The company ends year five with USD 8.1 "
    "million of cash and never approaches the covenant. The equity investor commits USD 8.0 million for "
    "7.7 percent, receives USD 20.3 million at exit for a 2.54x MOIC and a 20.5 percent IRR, and the "
    "debt investor earns a 1.57x MOIC and an 11.4 percent IRR. Both sides of the capital structure are "
    "adequately compensated, and existing holders retain 9.6 percentage points more of the company than "
    "under the all equity alternative.",
    st_body))

E.append(Paragraph("10. Key Risks", st_h1))
risks = [
    ["Risk", "Assessment"],
    ["Operating leverage does not arrive",
     "The entire case rests on operating expenses falling from 103 percent of revenue in year one to 75 "
     "percent in year five. If that schedule slips by even two years, EBITDA stays negative throughout "
     "and the debt component becomes a constraint rather than an advantage."],
    ["Gross retention deteriorates",
     "At 88 percent, 12 percent of the base is lost annually. A fall to 82 percent, as modelled in the "
     "downside, forces substantially more new ARR to hit the same target and raises customer acquisition "
     "cost at exactly the point cash is tightest."],
    ["Rule of 40 stays below 40",
     "The company never reaches 40 inside the forecast. That constrains the exit multiple, and the 7.0x "
     "assumption should be regarded as the upper end of what this profile supports."],
    ["Refinancing risk at maturity",
     "USD 10.8 million remains outstanding at year five under the blended structure against USD 1.0 "
     "million of annual unlevered free cash flow. The facility must be refinanced, not repaid from "
     "operations."],
    ["Covenant headroom narrows late",
     "Headroom falls to USD 3.1 million by year five. A single year of underperformance in year four or "
     "five puts the covenant in play, which is why the structure is recommended with a monitoring "
     "condition rather than unconditionally."],
    ["Category bundling",
     "Large application vendors ship competing workflow automation inside products customers already own, "
     "which caps pricing power and is the most likely cause of the downside retention scenario."],
]
E.append(table(risks, [W * 0.28, W * 0.72], align_right_from=99))

# ============================================ Page 5: recommendation, diligence
E.append(Paragraph("11. Preliminary Recommendation", st_h1))
E.append(callout(
    "Recommended structure: USD 8 million primary equity plus a USD 12 million senior secured facility",
    "The blended structure is recommended because it is the only one that funds the growth plan in full "
    "without either paying an unnecessary dilution premium or taking debt service the business cannot "
    "carry. It is a balance of six considerations, set out below, and it is a conditional conclusion "
    "rather than a certain one."))
E.append(Spacer(1, 4))

rec = [
    ["Consideration", "Assessment"],
    ["Founder dilution",
     "7.7 percent against 17.2 percent for the all equity case, a saving of 9.6 percentage points for the "
     "same USD 20 million of capital. On a USD 264 million exit equity value that difference is worth "
     "roughly USD 25 million to existing holders."],
    ["Growth investment",
     "The full USD 20 million is deployed. The structure choice does not reduce the growth plan, which is "
     "the point of comparing structures against a constant operating forecast."],
    ["Debt service risk",
     "Annual debt service peaks at USD 1.9 million against a peak annual cash outflow the company can "
     "absorb. The USD 20 million facility peaks at USD 3.3 million and cannot be absorbed."],
    ["Cash runway",
     "Year five cash of USD 8.1 million against USD 2.3 million under all debt, with the minimum cash "
     "covenant never breached in the base case."],
    ["Investor return potential",
     "Equity MOIC of 2.54x against 2.44x, because a smaller cheque is exposed to the same enterprise "
     "value appreciation. The debt investor earns 11.4 percent, which is adequate for the seniority and "
     "the leverage level."],
    ["Downside protection",
     "The debt tranche sits ahead of equity and amortises from year four, and the smaller equity cheque "
     "limits capital at risk. This is also where the recommendation is weakest, and the caveat below "
     "should be read as part of the recommendation rather than as a qualification to it."],
    ["Flexibility",
     "A USD 12 million facility leaves headroom to upsize against a larger ARR base in year three or "
     "four. A USD 20 million facility taken at this scale forecloses that option."],
]
E.append(table(rec, [W * 0.24, W * 0.76], align_right_from=99))
E.append(Spacer(1, 5))

E.append(callout(
    "Where this conclusion could be wrong",
    "The recommendation holds if the company sustains growth close to the base case and if operating "
    "leverage arrives on the assumed schedule. Under the downside case, growth of 18 percent, net "
    "revenue retention of 100 percent, gross retention of 82 percent, and gross margin of 74 percent, "
    "the blended structure survives with only USD 0.4 million of cash and breaches the minimum cash "
    "covenant in year four. The all equity structure ends that scenario with USD 8.4 million and no "
    "breach. A reader who assigns a materially higher probability to the downside than to the base case "
    "should prefer more equity in the mix, and the equity component is an editable input in the "
    "accompanying model precisely so that view can be tested rather than argued.",
    tone="warn"))
E.append(Spacer(1, 5))

E.append(Paragraph("12. Additional Diligence Required", st_h1))
E.append(Paragraph(
    "The analysis above is built on assumptions, not on a data room. The following would have to be "
    "confirmed before any of it could be relied upon.",
    st_body))
dd = [
    ["Area", "What must be confirmed"],
    ["Retention",
     "Cohort level gross and net retention for at least three years, split by contract size. Blended "
     "retention conceals exactly the dynamic that determines whether the growth plan is achievable."],
    ["Revenue quality",
     "Contracted ARR against usage or month to month revenue, contract length distribution, and the "
     "proportion of ARR on multi year terms. A lender advances against contracted revenue, not ARR."],
    ["Customer concentration",
     "Revenue from the largest ten customers. A base of 240 accounts can still carry material "
     "concentration, and concentration is the first thing a facility would be sized against."],
    ["Unit economics",
     "Fully loaded customer acquisition cost by channel and segment, to test whether the CAC payback "
     "assumption survives the move upmarket."],
    ["Cost structure",
     "A bottom up build of the operating expense schedule, since the entire case depends on the ratios "
     "declining on the assumed path rather than on a target."],
    ["Existing debt",
     "Terms, covenants, security, and prepayment penalties on the USD 3.0 million being refinanced, and "
     "confirmation there is no other indebtedness."],
    ["Working capital",
     "Deferred revenue balance, billing frequency, and days sales outstanding, since the deferred revenue "
     "benefit is a real source of cash in the model and is sensitive to billing terms."],
    ["Gross margin",
     "The split between subscription and services revenue and the margin on each, since a services heavy "
     "mix would materially change the 78 percent blended assumption."],
]
E.append(table(dd, [W * 0.22, W * 0.78], align_right_from=99))
E.append(Spacer(1, 6))

E.append(Paragraph("13. Disclosure", st_h1))
E.append(disclosure_bar(HYPO_LONG))
E.append(Spacer(1, 4))
E.append(Paragraph(PROJECT_DISCLOSURE, st_small))
E.append(Spacer(1, 4))
E.append(Paragraph(
    "Sahil Modi designed the research framework, scoring logic, underwriting structure, and investment "
    "analysis. AI-assisted development tools were used to support coding, research organization, testing, "
    "and document production. Every company record and material claim was reviewed against dated public "
    "sources.",
    st_small))
E.append(Spacer(1, 4))
E.append(Paragraph(
    "This memorandum accompanies Enterprise Software Growth Capital Model.xlsx, in which every assumption "
    "used here is an editable input and every figure quoted here is a live formula. Source code, the real "
    "private company research universe, and the scripts that generate both documents are public at "
    "github.com/smodi13/growth-capital-origination-engine.",
    st_small))
E.append(Spacer(1, 4))
E.append(rule(RULE, 0.6))
E.append(Spacer(1, 3))
E.append(Paragraph(
    "Built by Sahil Modi  |  modi.sahil@gmail.com  |  linkedin.com/in/sahil-modi-",
    st_small))

doc.build(E)
print(f"Wrote {OUT}")
