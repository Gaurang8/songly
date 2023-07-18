import React from "react";
import "./Table.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import SegmentIcon from "@mui/icons-material/Segment";

function Table() {
  return (
    <>
      <div className="tb-body-content">
        <div className="tb-body-data">
          <div className="tb-body-input">
            <div className="tb-body-filter">
              <select>
                <option>Select Filter</option>
                <option>Select Name</option>
                <option>Select User name</option>
              </select>
            </div>
            <div className="tb-body-search">
              <div className="tb-search-field">
                <input
                  type="text"
                  name="search-inp"
                  placeholder="search hear.."
                />
              </div>
              <div>
                <button type="submit">Search</button>
              </div>
            </div>
            <div className="tb-add-item">
              <button type="submit">
                <AddIcon />
                <span> Add Item</span>
              </button>
            </div>
          </div>
          <div className="tb-row-data">
            <table className="tb-table">
              <thead>
                <th>#</th>
                <th>Name</th>
                <th>slots Allowance time</th>
                <th>Open</th>
                <th>Close</th>
                <th>Phone</th>
                <th>Status</th>
                <th>updated At</th>
                <th>updated At</th>
                <th>Actions</th>
              </thead>
              <tr>
                <td>
                  <img src="..." alt="?" />
                </td>
                <td>Name</td>
                <td>slots Allowance time</td>
                <td>Open</td>
                <td>Close</td>
                <td>Phone</td>
                <td>Status</td>
                <td>updated At</td>
                <td>updated At</td>
                <td className="tb-row-icons">
                  <a>
                    <RemoveRedEyeIcon />
                  </a>
                  <a>
                    <SegmentIcon />
                  </a>
                  <a>
                    <CreateIcon />
                  </a>
                  <a className="r-delete">
                    <DeleteIcon />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="..." alt="?" />
                </td>
                <td>Name</td>
                <td>slots Allowance time</td>
                <td>Open</td>
                <td>Close</td>
                <td>Phone</td>
                <td>Status</td>
                <td>updated At</td>
                <td>updated At</td>
                <td className="tb-row-icons">
                  <a>
                    <RemoveRedEyeIcon />
                  </a>
                  <a>
                    <SegmentIcon />
                  </a>
                  <a>
                    <CreateIcon />
                  </a>
                  <a className="r-delete">
                    <DeleteIcon />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="..." alt="?" />
                </td>
                <td>Name</td>
                <td>slots Allowance time</td>
                <td>Open</td>
                <td>Close</td>
                <td>Phone</td>
                <td>Status</td>
                <td>updated At</td>
                <td>updated At</td>
                <td>
                  <a>a</a>
                  <a>a</a>
                  <a>a</a>
                  <a>a</a>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="..." alt="?" />
                </td>
                <td>Name</td>
                <td>slots Allowance time</td>
                <td>Open</td>
                <td>Close</td>
                <td>Phone</td>
                <td>Status</td>
                <td>updated At</td>
                <td>updated At</td>
                <td>
                  <a>a</a>
                  <a>a</a>
                  <a>a</a>
                  <a>a</a>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="..." alt="?" />
                </td>
                <td>Name</td>
                <td>slots Allowance time</td>
                <td>Open</td>
                <td>Close</td>
                <td>Phone</td>
                <td>Status</td>
                <td>updated At</td>
                <td>updated At</td>
                <td>
                  <a>a</a>
                  <a>a</a>
                  <a>a</a>
                  <a>a</a>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="..." alt="?" />
                </td>
                <td>Name</td>
                <td>slots Allowance time</td>
                <td>Open</td>
                <td>Close</td>
                <td>Phone</td>
                <td>Status</td>
                <td>updated At</td>
                <td>updated At</td>
                <td>
                  <a>a</a>
                  <a>a</a>
                  <a>a</a>
                  <a>a</a>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="tb-body-footer">
          <div className="tb-reasult-count">showing 1 to 20 of 92 entries</div>
          <div className="tb-more-results">
            <div class="tb-pagination">
              <a href="#">«</a>
              <a href="#">1</a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#">4</a>
              <a class="active" href="#">
                5
              </a>
              <a href="#">6</a>
              <a href="#">7</a>
              <a href="#">»</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
