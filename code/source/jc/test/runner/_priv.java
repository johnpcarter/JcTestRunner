package jc.test.runner;

// -----( IS Java Code Template v1.2

import com.wm.data.*;
import com.wm.util.Values;
import com.wm.app.b2b.server.Service;
import com.wm.app.b2b.server.ServiceException;
// --- <<IS-START-IMPORTS>> ---
import com.wm.util.GlobalVariables;
import com.wm.app.b2b.server.globalvariables.GlobalVariablesManager;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import com.wm.app.b2b.server.ServerAPI;
import com.wm.app.b2b.server.ServerStartupNotifier;
// --- <<IS-END-IMPORTS>> ---

public final class _priv

{
	// ---( internal utility methods )---

	final static _priv _instance = new _priv();

	static _priv _newInstance() { return new _priv(); }

	static _priv _cast(Object o) { return (_priv)o; }

	// ---( server methods )---




	public static final void _run (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(_run)>> ---
		// @sigtype java 3.5
		// [i] field:0:optional packages
		// [o] field:0:required exeStatus
		// [o] field:0:optional error
		IDataCursor c = pipeline.getCursor();
		String packages = IDataUtil.getString(c, "packages");
		
		if (!allowAutomaticRun()) 
			return;
		
		try {
			Process proc1 = Runtime.getRuntime().exec(String.format("chmod u+x ./packages/JcTestRunner/resources/run-all-tests.sh", "./packages/JcTestRunner/resources"));
			
			synchronized(proc1) {
			try {
				proc1.wait();
			} catch (InterruptedException e) {
				ServerAPI.logError(e);
			}
		}
			
		System.out.println("permission exit status " + proc1.exitValue());
		
		Process proc = null;
		
		if (packages != null) 
			proc = Runtime.getRuntime().exec(String.format("./packages/JcTestRunner/resources/run-all-tests.sh " + packages, "./packages/JcTestRunner/resources"));
		else
			proc = Runtime.getRuntime().exec(String.format("./packages/JcTestRunner/resources/run-all-tests.sh", "./packages/JcTestRunner/resources"));
		
		synchronized(proc) {
			try {
				proc.wait();
			} catch (InterruptedException e) {
				ServerAPI.logError(e);
			}
		}
			
		System.out.println("run exit status " + proc.exitValue());
		
		String error = null;
			
		if (proc.exitValue() > 0) {
			error = new BufferedReader(
			      new InputStreamReader(proc.getErrorStream(), StandardCharsets.UTF_8))
			        .lines()
			        .collect(Collectors.joining("\n"));
				
			System.out.println("run error " + error);
		
		}
			
		IDataUtil.put(c,  "exeStatus", "" + proc.exitValue());
			
		if (error != null) {
			IDataUtil.put(c,  "error", "" + error);
		
		}
			c.destroy();
		} catch (IOException e) {
			ServerAPI.logError(e);
		}
		// --- <<IS-END>> ---

                
	}



	public static final void convertToString (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(convertToString)>> ---
		// @sigtype java 3.5
		// [i] object:1:required list
		// [i] field:0:optional separator
		// [o] field:0:required out
		// pipeline in
		
		IDataCursor pipelineCursor = pipeline.getCursor();
		Object[] list = IDataUtil.getObjectArray(pipelineCursor, "list");
		String separator = IDataUtil.getString(pipelineCursor, "separator");
		
		// process
		
		if (separator == null)
			separator = System.lineSeparator();
		
		String out = "";
		
		if (list != null) {
			
			for(Object o : list) {
				out += "\"" + o.toString() + "\"" + separator;
			}
			
			if (list.length > 0)
				out = out.substring(0, out.length()-1);
		}
		
		// pipeline out
		
		IDataUtil.put(pipelineCursor, "out", out);
		pipelineCursor.destroy();
		// --- <<IS-END>> ---

                
	}



	public static final void fileExists (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(fileExists)>> ---
		// @sigtype java 3.5
		// [i] field:0:required filename
		// [o] field:0:required exists
		IDataCursor c = pipeline.getCursor();
		String filename = IDataUtil.getString(c, "filename");
		
		IDataUtil.put(c, "exists", "" + new File("./packages/JcTestRunner/pub", filename).exists());
		
		c.destroy();
		// --- <<IS-END>> ---

                
	}



	public static final void getFileContents (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(getFileContents)>> ---
		// @sigtype java 3.5
		// [i] field:0:required filename
		// [o] field:0:required string
		IDataCursor c = pipeline.getCursor();
		String fname = IDataUtil.getString(c, "filename");
		
		if (fname == null)
			throw new ServiceException("provide file name please");
		
		// process
		
		byte[] data = null;
		try {
			data = Files.readAllBytes(Paths.get(fname));
		
		} catch (FileNotFoundException e) {
			throw new ServiceException(e);
		} catch (IOException e) {
			throw new ServiceException(e);
		}
			
		// pipeline out
		
		IDataUtil.put(c, "string", new String(data));
		// --- <<IS-END>> ---

                
	}



	public static final void getFileStream (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(getFileStream)>> ---
		// @sigtype java 3.5
		// [i] field:0:required filename
		// [o] object:0:required stream
		IDataCursor c = pipeline.getCursor();
		String fname = IDataUtil.getString(c, "filename");
		
		if (fname == null)
			throw new ServiceException("provide file name please");
		
		// process
		
		byte[] data = null;
		InputStream in;
		try {
			in = new FileInputStream(new File(fname));
		} catch (FileNotFoundException e) {
			throw new ServiceException(e);
		}
			
		// pipeline out
		
		IDataUtil.put(c, "stream", in);
		// --- <<IS-END>> ---

                
	}



	public static final void getHostName (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(getHostName)>> ---
		// @sigtype java 3.5
		// [o] field:0:required hostname
		IDataCursor c = pipeline.getCursor();
		IDataUtil.put(c, "hostname", getHostName());
		c.destroy();
		// --- <<IS-END>> ---

                
	}



	public static final void listTextSuiteFiles (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(listTextSuiteFiles)>> ---
		// @sigtype java 3.5
		// Reading the folder and getting Stream.
		try (Stream<Path> walk = Files.walk(Paths.get("./packages"))) {
		
		    // Filtering the paths by a folder and adding into a list.
		
		    List<String> fileNamesList = walk.map(x -> x.toString()).filter(f -> f.contains("TestSuite.xml"))
		            .collect(Collectors.toList());
		
		    // printing the folder names
		    fileNamesList.forEach(System.out::println);
		
		    IDataCursor c = pipeline.getCursor();
		    IDataUtil.put(c, "testSuites", fileNamesList.toArray(new String[fileNamesList.size()]));
		    c.destroy();
		} catch (IOException e) {
		    e.printStackTrace();
		}
		// --- <<IS-END>> ---

                
	}



	public static final void packagesUnderTest (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(packagesUnderTest)>> ---
		// @sigtype java 3.5
		// [o] field:1:required packages
		IDataCursor c = pipeline.getCursor();
		IDataUtil.put(c, "packages", availableCases());
		c.destroy();
		// --- <<IS-END>> ---

                
	}



	public static final void results (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(results)>> ---
		// @sigtype java 3.5
		// [o] record:1:required cases
		// [o] - field:0:required name
		// [o] - field:0:required filename
		File[] files = new File("./packages/JcTestRunner/pub/results").listFiles(new FilenameFilter() {
			
			@Override
			public boolean accept(File dir, String name) {
				return name.startsWith("TEST-");
			}
		});
		
		if (files == null) {
			return;
		}
		
		IData[] tests = new IData[files.length];
		int i = 0;	
		for(File file : files) {
			IData doc = IDataFactory.create();
			IDataCursor dc = doc.getCursor();
			IDataUtil.put(dc, "filename", file.getName());
			IDataUtil.put(dc, "name", file.getName().substring(file.getName().indexOf("_")+1, file.getName().length()-4));
			dc.destroy();
		
			tests[i++] = doc;
		}
		
		IDataCursor c = pipeline.getCursor();
		IDataUtil.put(c, "cases", tests);
		c.destroy();
			
		// --- <<IS-END>> ---

                
	}



	public static final void runTests (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(runTests)>> ---
		// @sigtype java 3.5
		new ServerStartupNotifier().registerForStartup("jc.test.runner._priv:_run", pipeline);
		// --- <<IS-END>> ---

                
	}



	public static final void zipit (IData pipeline)
        throws ServiceException
	{
		// --- <<IS-START(zipit)>> ---
		// @sigtype java 3.5
		// [i] field:0:required sourceFolder
		// [i] field:0:required zipFile
		// [o] field:0:required zipFile
		// pipeline in
		
		IDataCursor pipelineCursor = pipeline.getCursor();
		String sourceFolder = IDataUtil.getString(pipelineCursor, "sourceFolder");
		String zipFile = IDataUtil.getString(pipelineCursor, "zipFile");
				
		// process
				
		System.out.println("build dir is " + sourceFolder + ", preparing zip file " + zipFile);
				
		try {
			if (!zipFile.startsWith("/") && !zipFile.startsWith("./"))
				zipFile = new File(new File(sourceFolder).getParent(), zipFile).getAbsolutePath();
				
			if (!zipFile.endsWith(".zip"))
				zipFile += ".zip";
				
			new Zipper().zipIt(sourceFolder, zipFile);
				
			byte[] contents;
				
			contents = Files.readAllBytes(FileSystems.getDefault().getPath(zipFile));
		} catch (IOException e) {
			e.printStackTrace();
					
			throw new ServiceException("Cannot read zipped file '" + zipFile + "' " + e.getLocalizedMessage());
		}
				
		// pipeline out
				
		//IDataUtil.put(pipelineCursor, "contents", contents);
				
		if (zipFile != null)
			IDataUtil.put(pipelineCursor, "zipFile", new File(zipFile).getName());
				
			pipelineCursor.destroy();
		// --- <<IS-END>> ---

                
	}

	// --- <<IS-START-SHARED>> ---
	
	public static boolean allowAutomaticRun() {
		
		try {
		    GlobalVariablesManager manager = GlobalVariablesManager.getInstance();
		    GlobalVariables.GlobalVariableValue gvValue = manager.getGlobalVariableValue("jc.test.runner.manual");
		    
		    String value = gvValue.getValue();
		    
		    return !value.equalsIgnoreCase("true");
		}
		catch (Exception e) {
			return true;
		}
	}
	
	public static String[] availableCases() {
	
		File[] files = new File("./packages").listFiles(new FilenameFilter() {
			
			@Override
			public boolean accept(File dir, String name) {
				
				if (new File(dir, name + "/resources/test/setup").exists()) {
					return new File(dir, name + "/resources/test/setup").listFiles(new FilenameFilter() {
						@Override
						public boolean accept(File dir, String name) {
							return name.endsWith(".xml");
						}
					}).length > 0;
				} else {
					return false;
				}
			}
		});
		
		String[] packages = new String[files.length];
		
		for (int z = 0; z < files.length; z++) {
			
			packages[z] = files[z].getName();
		};
		
		return packages;
	}
	
	public static String getHostName() throws ServiceException {
	    
		try {
			return InetAddress.getLocalHost().getHostName();
		} catch (UnknownHostException e) {
			throw new ServiceException(e);
		}
	}
	
	private static class Zipper {
		
		private String _sourceFolder;
		
		private List <String> fileList = new ArrayList<String>();
		
		public void zipIt(String sourceFolder, String zipFile) {
			
			this._sourceFolder = sourceFolder;
		
			this.generateFileList(new File(sourceFolder));
				
		    byte[] buffer = new byte[1024];
		    String source = new File(sourceFolder).getName();
		    FileOutputStream fos = null;
		    ZipOutputStream zos = null;
		    try {
		        fos = new FileOutputStream(zipFile);
		        zos = new ZipOutputStream(fos);
		
		        System.out.println("Output to Zip : " + zipFile);
		        FileInputStream in = null;
		
		        for (String file: this.fileList) {
		            System.out.println("File Added : " + file);
		            ZipEntry ze = new ZipEntry(source + File.separator + file);
		            zos.putNextEntry(ze);
		            try {
		                in = new FileInputStream(this._sourceFolder + File.separator + file);
		                int len;
		                while ((len = in .read(buffer)) > 0) {
		                    zos.write(buffer, 0, len);
		                }
		            } finally {
		                in.close();
		            }
		        }
		
		        zos.closeEntry();
		        System.out.println("Folder successfully compressed");
		
		    } catch (IOException ex) {
		        ex.printStackTrace();
		    } finally {
		        try {
		            zos.close();
		        } catch (IOException e) {
		            e.printStackTrace();
		        }
		    }
		}
		
		public void generateFileList(File node) {
		    // add file only
		    if (node.isFile()) {
		        fileList.add(generateZipEntry(node.toString()));
		    }
		
		    if (node.isDirectory()) {
		        String[] subNote = node.list();
		        for (String filename: subNote) {
		            generateFileList(new File(node, filename));
		        }
		    }
		}
		
		private String generateZipEntry(String file) {
					
		    return file.substring(_sourceFolder.length() + 1, file.length());
		}
	}
	// --- <<IS-END-SHARED>> ---
}

