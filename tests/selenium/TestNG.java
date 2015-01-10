import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class TestNG {
	public static WebDriver driver;

	@Test

	public static void main() {

		//Test saving and deleting keyword
		driver.findElement(By.id("mbl-extension-open")).click();
		driver.findElement(By.id("mbl-extension-keyword-input")).sendKeys("keywordtofilter");
		driver.findElement(By.id("mbl-extension-addbutton")).click();
		driver.findElement(By.id("mbl-extension-save")).click();
		driver.findElement(By.id("mbl-extension-open")).click();
		Assert.assertEquals("keywordtofilter", driver.findElement(By.className("keyword_item")).getText());
		driver.findElement(By.id("mbl-extension-keyword-1")).click();
		driver.findElement(By.id("mbl-extension-save")).click();
		driver.findElement(By.id("mbl-extension-open")).click();
		Assert.assertFalse(driver.getPageSource().contains("keywordtofilter"));

		//Test blocking and unblocking categories
		driver.findElement(By.id("vidskipti_checkbox")).click();
		driver.findElement(By.id("mbl-extension-save")).click();
		driver.findElement(By.id("mbl-extension-open")).click();
		Assert.assertEquals("Viðskipti - blokkað", driver.findElement(By.id("vidskipti_checkbox")).getText());
		driver.findElement(By.id("vidskipti_checkbox")).click();
		driver.findElement(By.id("mbl-extension-save")).click();
		driver.findElement(By.id("mbl-extension-open")).click();
		Assert.assertEquals("Viðskipti", driver.findElement(By.id("vidskipti_checkbox")).getText());
	}

	@BeforeMethod

	public void beforeMethod() throws IOException {

		File file = new File("moggo.xpi");
		FirefoxProfile firefoxProfile = new FirefoxProfile();
		firefoxProfile.addExtension(file);

		// Create a new instance of the Firefox driver

		driver = new FirefoxDriver(firefoxProfile);

		//Put a Implicit wait, this means that any search for elements on the page could take the time the implicit wait is set for before throwing exception

		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

		//Launch the website

		driver.get("http://www.mbl.is");

	}

	@AfterMethod

	public void afterMethod() {

		// Close the driver
		driver.quit();
	}

}
