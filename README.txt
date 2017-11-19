# JSCMiner
JSCMiner: A Flexible and Fast Code Clone Detector for JavaScript Applications.

-- What the base project did?(XIAO: A Clone Detection Tool)
Answer: The base project is code clone detector called XIAO. It detect code clones only in C/C++ languages. 
Whiling detection clones, it parse the source code hash the statements. The hasing values are indexed and 
further used to detect clones. 
Features of XIAO
1. High Tune-ability
2. High Scalability
3. High Compatibility
4. High Exportability

-- What this project did?
JSCMiner is a flexiable and fast code clone detector for JavaScript applications. I


-- If you were able to extend it, and if so - how?
FEATURES OF JSCMINER
a) Configurable
JSCMiner allows users to easily set and tune tool-parameter values
(e.g., maximum and minimum lines of code and tokens), to producewhat the users want. User can detect clones 
in various granularitysuch as file, function and block level. It enable users to effectivelycontrol the syntactic 
similarity between two code fragments of nearmismatch clone pair by setting the similarity threshold. Besides,users
can also select the similarity function (e.g., Cosine, Jaccard,and Overlap similarity function) that they want to 
use for detectingnear mismatch clones.
b)Explorable
JSCMiner enables users to easily explore and manipulate the 
de-tected clones in various format. User can get clone report into theirdesired forms such as JSON, HTML or in XML. 
In real time clonedetection during development phase, user can instantly visualizethe detected clones in the editor. 
It helps users to quickly capture whether there is any difference between the two cloned code frag-ments, what kind of 
difference it is, how much difference there isand which type of clone it is.
c)Compatible
Since, JSCMiner is developed on top ofNode.jsframework, it iscompatible to any platform (Windows, Linux and Mac). 
Consideringthe purpose of usage, JSCMiner is developed in two forms such asCommand Line Interface (CLI) and an extension
for Visual StudioCode (VSCode). The CIL of JSCMiner can be useful for mining interproject clones in large code repository.
On the other hand, Theextension will be beneficial for instantly detecting clone duringsoftware development time.
d)Scalable
Scalability is one of the most desired feature of JSCMiner since itis the only code clone detector that is scalable 
to large JavaScriptcode repository. In the scalability testing experiments, JSCMinerscalabilty performace is compared 
with the state of the art tools(Simian, PMD, JSInspect and JSCD), it is found that JSCMiner suc-cessfully scales to 
20MLOC on a standard workstation with 8 GBRAM and detect first three types of clones.
e) Accuracy
The accuracy of JSCMiner in detecting clones is very high compar-ing to other state of the art tools. It gave 100% recall 
in detectingboth Type-1 and Type-2 clones. For detecting Type-3 clones, it pro-duced 97% recall. Moreover, it gave overall 
88% precision that isalso high enough with comparison of the other tools.


-- Details on data you worked on (if base paper dataset, provide link; if not, provide link if available in online, if you generated it - how you did)

Answer: Here, manullay detected clones for a small application is used to test the performance of JSCMiner.Besides,
a lager JavaScript application dataset is used to mining code clones using JSCMiner. The dataset consisting 
of 9K JavaScript application 150'000 JavaScript files. The details of this dataset can be found in the following link.
[http://www.srl.inf.ethz.ch/js150.php]


-- Detailed Instructions on how to use it

Answer: To run JSCMiner, users just open a terminal in the desired directory of any JavaScript application.
Then uses have to just type jscminer and hit enter. By doing this, a prompt menus is shown into the terminal.
It asks some  question about the configuration setting of JSCMiner. Users can select the setting by using the
arrow keys. The JSCMiner is run with those configuration. Finally, the detected clones are found in clone.json file.

-- Tradeoffs you made while doing the project compared to the base project