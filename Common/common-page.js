const { test, expect, chromium } = require('@playwright/test')
const path = require('path')
const fs = require('fs')
const fsp = fs.promises

exports.CommonTool = class CommonTool {
    constructor(testTitle = 'Default_Test') {
        this.stepCounter = 1
        this.testTitle = testTitle
        this.flowname = ''
        this.resourcesDir = path.resolve(__dirname, '../resources')
        this.tempFakeVideo = path.join(this.resourcesDir, 'temp-fake-video.y4m')
    }

    setTitleflowVideo(flowname) {
        this.flowname = flowname
    }

    async lingerForRecording(page, ms = 1200) {
        await page.evaluate(
            () =>
                new Promise(r =>
                    requestAnimationFrame(() => requestAnimationFrame(r)),
                ),
        )
        await page.waitForTimeout(ms)
    }

    async takeScreenshot(page, flow, stepName) {
        const stepNumber = String(this.stepCounter++).padStart(2, '0')
        const filePath = `screenshots/${flow}/${this.testTitle}/${stepNumber}_${stepName}.png`
        console.log('filePath', filePath)
        // ensure destination folder exists
        await fsp.mkdir(path.dirname(filePath), { recursive: true })
        await page.screenshot({ path: filePath, fullPage: true })
    }
    async takeScreenshotFullPage(page, flow, stepName, viewport = null) {
        const originalViewport = page.viewportSize()

        if (viewport) {
            await page.setViewportSize(viewport)
        }

        const stepNumber = String(this.stepCounter++).padStart(2, '0')
        const filePath = `screenshots/${flow}/${this.testTitle}/${stepNumber}_${stepName}.png`
        const screenshotOptions = {
            path: filePath,
            fullPage: true,
        }

        // create folder if it doesn't exist
        await fsp.mkdir(path.dirname(filePath), { recursive: true })
        await page.screenshot(screenshotOptions)

        if (viewport && originalViewport) {
            await page.setViewportSize(originalViewport)
        }
    }

    async closeAll({ page, context, browser, lingerMs = 1200 }) {
        try {
            await page?.waitForLoadState('networkidle').catch(() => {})
            if (page) await this.lingerForRecording(page, lingerMs)

            const video = page?.video ? page.video() : null

            if (page && !page.isClosed()) await page.close().catch(() => {})
            if (context) await context.close().catch(() => {})

            if (video) {
                const p = await video.path().catch(() => null)
                if (p) console.log('[VIDEO] saved to:', p)
            }

            if (browser) await browser.close().catch(() => {})
            console.log('[CLOSE] Browser, context, page closed successfully.')
        } catch (err) {
            console.error('[CLOSE] Error while closing browser:', err)
        }
    }

    async saveAndAttach(name, content, contentType) {
        const out = test.info().outputPath(name)
        await fsp.writeFile(out, content)
        await test.info().attach(name, { path: out, contentType })
    }

    async createPageWithFakeVideo(pathToVideo, flow) {
        // optionally allow callers to specify a flow name inline (useful for
        // tests that want to override the default flow set earlier).
        if (flow) {
            this.setTitleflowVideo(flow)
        }

        const fakeVideoPath = pathFile => path.resolve(__dirname, pathFile)

        const browser = await chromium.launch({
            headless: true,
            permissions: ['camera'],
            args: [
                '--allow-file-access-from-files',
                '--use-fake-ui-for-media-stream',
                '--use-fake-device-for-media-stream',
                `--use-file-for-fake-video-capture=${fakeVideoPath(pathToVideo)}`,
            ],
        })

        const now = new Date()
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'Asia/Bangkok',
        }
        const timestamp = now
            .toLocaleString('sv-SE', options)
            .replace(/[- :]/g, '-')

        // ensure we provide an explicit viewport size so we don't run
        // afoul of the global `viewport: null` configuration (which
        // triggers an unsupported deviceScaleFactor setting).
        const context = await browser.newContext({
            viewport: { width: 1200, height: 1000 },
            permissions: ['camera', 'microphone'],
            ignoreHTTPSErrors: true,
            recordVideo: {
                dir: `videos/${this.flowname}/${this.testTitle}/${timestamp}`,
                size: { width: 1200, height: 1000 },
            },
        })

        const page = await context.newPage()
        return { browser, context, page }
    }

    logAndTimeStamp(message) {
        const date = new Date()
        const bangkokTime = date.toLocaleString('en-US', {
            timeZone: 'Asia/Bangkok',
        })
        console.log(message, bangkokTime)
    }
    
}