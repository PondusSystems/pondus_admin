const mongoose = require("mongoose");

const configSchema = new mongoose.Schema(
  {
    host: {
      type: String,
      required: true,
      trim: true
    },
    dbURI: {
      type: String,
      required: true,
      trim: true
    },
    stripe: {
      apiKey: {
        type: String,
        required: true,
        trim: true
      },
      webhookKey: {
        type: String,
        required: true,
        trim: true
      }
    },
    nodemailer: {
      service: {
        type: String,
        required: true,
        trim: true
      },
      senderEmail: {
        type: String,
        required: true,
        trim: true
      },
      senderPassword: {
        type: String,
        required: true,
        trim: true
      }
    }
  },
  { _id: false }
);

const tenantSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    tenantId: {
      type: String,
      required: true,
      trim: true
    },
    config: configSchema,
    status: {
      type: String,
      default: 'enabled',
      enum: ['enabled', 'disabled']
    }
  },
  { timestamps: true }
);

const Tenant = mongoose.model("tenant", tenantSchema);

module.exports = Tenant;
