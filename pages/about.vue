<template>
  <div class="about-us">
    <el-row justify="center">
      <el-col :span="18">
        <h1 class="about-us__title">About AlloPipe</h1>
        <el-divider />
        <el-alert
          :title="''"
          type="success"
          :closable="false"
          class="github-alert"
        >
          <el-row
            class="github-section"
            align="middle"
            :gutter="20"
          >
            <el-col
              :xs="6"
              :sm="4"
              class="icon-col"
            >
              <Icon
                name="uil:github"
                style="color: grey"
                size="2em"
              />
            </el-col>
            <el-col
              :xs="18"
              :sm="20"
            >
              <div class="text-wrapper">
                <strong>We are open source!</strong>
              </div>
              <div class="text-wrapper github-link-wrapper">
                <span>AlloPipe is available from</span>
                <a
                  href="https://github.com/huguesrichard/Allopipe"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="github-link"
                >https://github.com/huguesrichard/Allopipe</a>

              </div>
            </el-col>
          </el-row>
        </el-alert>
        <div>
          <p class="about-us__description">
            AlloPipe is a computational tool designed for large-scale genomic comparisons between two human samples
            which has been developed in the context of transplantation - whether of Solid Organ Transplantation (SOT)
            or Haematopoietic Cell Tranplantation (HCT).
          </p>

          <p class="about-us__description">
            From high throughput sequencing data - such as Whole Exome Sequencing (WES) or Whole Genome Sequencing (WGS) -
            AlloPipe returns the genomic differences between the donor and the recipient that meet the users specifications
            in terms of:
          </p>

          <ul class="about-us__list">
            <li>Protein impact (synonymous/non-synonymous polymorphisms, early stop codon)</li>
            <li>Protein expression (restriction to a transcript list)</li>
            <li>Genomic localisation (restriction to a bedfile)</li>
          </ul>

          <p class="about-us__description">
            This tool therefore provides insights onto non-HLA polymorphisms potentially triggering indirect alloreactivity.
          </p>

          <p class="about-us__description">
            Our mission is to enhance transplantation outcomes by developing
            innovative tools for better donor/recipient matching and personalized
            immunosuppressive therapies.
          </p>
        </div>
        <h2 class="about-us__title">AlloPipe Features</h2>
        <el-timeline>
          <el-timeline-item
            size="large"
            v-for="feature in allopipeFeatures"
            :key="feature.title"
            :timestamp="feature.title"
          >
            {{ feature.description }}
          </el-timeline-item>
        </el-timeline>
        <h2 class="about-us__title">Our Team</h2>
        <el-row :gutter="20">
          <el-col
            :span="8"
            v-for="member in teamMembers"
            :key="member.name"
          >
            <el-card class="team-member">
              <img
                :src="member.avatar"
                class="team-member__avatar"
                alt="Team member avatar"
              />
              <h3>{{ member.name }}</h3>
              <!-- <p>{{ member.position }}</p> -->
              <p>{{ member.affiliation }}</p>
            </el-card>
          </el-col>
        </el-row>

        <!-- <h2 class="about-us__subtitle">Our Research</h2> -->
        <!-- <p>
          AlloPipe has been tested on a donor/recipient cohort of kidney transplantation (n=53 pairs), showing that nsSNP quantification within the pair is correlated to graft's chronic rejection. We are currently processing exomes of genoidentical (n=71) and haploidentical (n=40) pairs in haematopoietic stem cell transplantation.
        </p>
        <p>
          Our analyses can also be extended to constitutional and somatic samples in the context of tumoral processes, providing clues for the identification of specific minor histocompatibility antigens.
        </p> -->

      </el-col>
    </el-row>
  </div>
</template>

<script setup>
const teamMembers = [
  {
    name: "Hugues Richard",
    affiliation: "Sorbonne Université & Robert Koch Institut",
    avatar: "/img/team/hugues-richard.png",
  },
  {
    name: "Adèle Dhuyser",
    affiliation: "CHRU de Nancy & Université de Lorraine",
    avatar: "/img/team/adele.jpg",
  },
  {
    name: "Alice Aarnink",
    affiliation: "CHRU de Nancy & Université de Lorraine",
    avatar: "/img/team/alice-aarnink.jpg",
  },
  {
    name: "Laurent Mesnard",
    affiliation: "Sorbonne Université & AP-HP",
    avatar: "/img/team/laurent-mesnard.jpg",
  },
  {
    name: "Pierre Laville",
    affiliation: "Sorbonne Université",
    avatar: "/img/team/pierre_laville.png",
  },
];

const allopipeFeatures = [
  {
    title: "Allo-Count",
    description:
      "Compares exomes within two samples and returns the implied amino acid differences.",
  },
  // {
  //   title: "Allo-Affinity",
  //   description:
  //     "Processes Allo-Count results to output the immunopeptidomes' differences within the pair.",
  // },
  {
    title: "Flexibility",
    description:
      "Can be applied to both solid organ transplantation and haematopoietic stem cell transplantation.",
  },
  {
    title: "Open Source",
    description:
      "Available on GitHub with an easy installation process and few requirements.",
  },
];
</script>

<style scoped>
.el-timeline-item {
  font-size: 1.1rem;
  line-height: 1.6;
}

.el-timeline-item__timestamp {
  font-size: 1.2rem;
  font-weight: 600;
  color: #409eff;
}

.el-timeline-item__content {
  color: #606266;
  margin-top: 0.5rem;
}
.about-us__list {
  margin: 0 0 2rem 2rem;
  padding: 0;
  font-size: 1.1rem;
  line-height: 1.6;
}

.about-us__list li {
  margin-bottom: 0.5rem;
}

.github-alert {
  font-size: 1.1em;
  margin-bottom: 2rem;
}

.text-wrapper {
  line-height: 1.5;
}

.github-link-wrapper {
  word-break: break-word;
  white-space: normal;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.github-link {
  font-weight: bold;
  color: #67c23a;
  text-decoration: none;
  word-break: break-all;
}

.github-link:hover {
  text-decoration: underline;
}
.text-wrapper {
  line-height: 1.5;
}

.single-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.single-line span,
.single-line a {
  display: inline;
}

.about-us {
  padding: 2rem 0;
}

.about-us__title {
  font-size: 2.5rem;
  color: #409eff;
  margin-bottom: 1rem;
}

.about-us__subtitle {
  font-size: 1.8rem;
  color: #303133;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.about-us__description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.team-member {
  text-align: center;
  margin-bottom: 1rem;
}

.team-member__avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1rem;
  object-fit: cover; /* Ajout de cette ligne */
  object-position: center; /* Ajout de cette ligne */
}
</style>
